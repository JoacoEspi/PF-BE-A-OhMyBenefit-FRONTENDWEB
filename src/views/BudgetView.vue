<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <table class="table table-bordered table-striped">
                    <div>
                        <table class="table table-bordered table-striped">
                            <thead class="thead">
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitaro</th>
                                    <th>Precio total</th>
                                    <th>Super</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in items" :key="index">
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img :src="item.producto.imageUrl" :alt="item.producto.nombre" height="50"
                                                class="mr-2">
                                            <span>{{ item.producto.nombre }}</span>
                                        </div>
                                    </td>
                                    <td>{{ item.cantidad }}</td>
                                    <td>{{ `$${item.producto.precio}` }}</td>
                                    <td>{{ `$${item.total.toFixed(2)}` }}</td>
                                    <td>
                                        <div v-if="item.producto.idComercio == 1">
                                            <p class="card-text">Coto</p>
                                        </div>
                                        <div v-else-if="item.producto.idComercio == 2">
                                            <p class="card-text">Carrefour</p>
                                        </div>
                                        <div v-else-if="item.producto.idComercio == 3">
                                            <p class="card-text">Dia</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </table>
            </div>
            <div class="col-md-4">
                <div>
                    <h3>Total por Supermercado</h3>
                    <ul class="list-group">
                        <li v-for="(total, comercioID) in getTotalByComercioID" :key="comercioID" class="list-group-item">
                            <div v-if="comercioID == 1">
                                <p class="card-text">Coto</p>
                            </div>
                            <div v-else-if="comercioID == 2">
                                <p class="card-text">Carrefour</p>
                            </div>
                            <div v-else-if="comercioID == 3">
                                <p class="card-text">Dia</p>
                            </div>
                            {{ `$${total.toFixed(2)}` }}
                        </li>
                        <div class="result-wrapper">
                            <h3>El total es de:</h3>
                            <p>$ {{ presupuesto.importeTotal }}</p>
                            <button class="btn-calculate" @click="sendData">Guardar presupuesto</button>
                            <button class="btn-clear" @click="limpiarPresupuesto">Limpiar presupuesto</button>
                        </div>
                    </ul>
                </div>
            </div>
            <div>
                <div class="title-budget-history">
                    <h2>Historial de presupuestos</h2>
                </div>
                <div v-if="presupuestoHistorial.length > 0">
                    <div v-for="(presupuesto, index) in presupuestoHistorial.slice(1)" :key="index">
                        <div class="accordion" id="presupuestoAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading{{ index }}">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        :data-bs-target="'#collapse' + index" aria-expanded="true"
                                        :aria-controls="'collapse' + index">
                                        Presupuesto {{ index + 1 }}
                                    </button>
                                </h2>
                                <div :id="'collapse' + index" class="accordion-collapse collapse"
                                    :aria-labelledby="'heading' + index" data-bs-parent="#presupuestoAccordion">
                                    <div class="accordion-body">
                                        <div v-for="(item, i) in presupuesto.items" :key="i" class="mb-2">
                                            <p>{{ item.producto.nombre }} - Cantidad: {{ item.cantidad }}</p>
                                        </div>
                                        <div class="mt-3" v-if="presupuesto.importeTotal !== undefined">
                                            <h3>Importe Total del Presupuesto: ${{ presupuesto.importeTotal.toFixed(2) }}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useUserStore } from '../stores/userStore';
import service from '../service/userService';

export default {
    data() {
        return {
            items: [],
            aux: [],
            userEmail: '',
            presupuesto: {
                items: [],
                importeTotal: 0,
                mail: ''
            },
            presupuestoHistorial: []
        };
    },
    mounted() {
        const almacenado = useUserStore().getPresupuesto()
        this.aux = almacenado.items
        this.items = this.combineItems(this.aux)
        almacenado.items = this.items

        this.presupuesto = {
            items: almacenado.items,
            importeTotal: 0, // Keep it 0 initially
            mail: almacenado.usuario.mail
        }

        // Move this line after initializing presupuesto
        this.getHistorialPresuspuesto()
        this.obtenerTotal()
    },
    methods: {
        async sendData() {
            // Optionally, you can save the updated presupuesto to the store or perform other actions.
            try {
                console.log("se va a mandar esto:")
                console.log(this.presupuesto)
                if (this.presupuesto.items.length == 0) {
                    throw new Error("El presupuesto está vacio")
                }
                const response = await service.estimateCartPrice(this.presupuesto)
                alert("Se ha guardado el presupuesto!")
                useUserStore().clearPresupuesto()
                this.getHistorialPresuspuesto()
            } catch (error) {
                alert("Hubo un error al agregar su presupuesto: " + error.message)
            }
        },
        obtenerTotal() {
            this.presupuesto.importeTotal = this.items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
        },
        combineItems(itemList) {
            const combinedList = [];

            itemList.forEach(item => {
                const existingItem = combinedList.find(combinedItem => combinedItem.producto.codigo === item.producto.codigo);

                if (existingItem) {
                    // If the product exists, update the quantity and total
                    existingItem.cantidad += item.cantidad;
                    existingItem.total += item.total;
                } else {
                    // If the product doesn't exist, add a new entry
                    combinedList.push({ ...item });
                }
            });

            return combinedList;
        },
        async getHistorialPresuspuesto() {
            try {
                const userId = useUserStore().getId();
                this.presupuestoHistorial = await service.getAllCartsByUserId(userId)

            } catch (error) {
                alert("Hubo un error obteniendo el historial")
            }
        },
        limpiarPresupuesto() {
            const borrar = confirm("Estas seguro que deseas limpiar tu presupuesto?");

            if (borrar) {
                useUserStore().clearPresupuesto();
                this.presupuesto = {
                    items: [],
                    importeTotal: 0,
                    mail: ''
                };
                this.items = [];
            }

        }
    },
    computed: {
        getTotalByComercioID() {
            const totalByComercioID = {};

            this.items.forEach(item => {
                const comercioID = item.producto.idComercio;
                if (totalByComercioID[comercioID] === undefined) {
                    totalByComercioID[comercioID] = 0;
                }
                totalByComercioID[comercioID] += item.total;
            });

            return totalByComercioID;
        }
    }
};
</script>
<style scoped>
.row {
    margin-top: 2%;
}
.container-fluid{
    background-color: #fdfff8;
}
.btn-calculate {
    background-color: #e1386e;
    color: #fdfff8;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 112px;
    box-shadow: 5px 5px rgba(0, 0, 0, 1);
    transition: transform 0.2s;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


.btn-clear {
    border-color: #e1386e;
    color: #e1386e;
    background-color: none;
    padding: 10px 20px;
    margin-top: 20px;
    margin-left: 5px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 112px;
    box-shadow: 5px 5px rgba(0, 0, 0, 1);
    transition: transform 0.2s;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.btn-calculate:hover {
    background-color: #e1386e;
    color: #fdfff8;
}

.btn-calculate:active {
    transform: translateY(2px);
    background-color: #820646 !important;
    box-shadow: none;
    color: #fdfff8 !important;
}
</style>