<!-- <script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<template>


<div class="container">
  <header>
    <nav>

    </nav>
  </header>
  <h1> Login</h1>
  <img class="logo" src="../assets/images/LogoOMB-sin-fondo.png">
  <div id="log-in">
  <br/>
    <div class="login-input">
      <div class="email-title">
        EMAIL
      </div> 
      <input type="text" class="email-input">
      <div class="password-title">
        CONTRASEÑA
      </div> 
      <input type="password" class="password-input">
    </div>
  <div class="login-options">
    <div class="password-restore">
      <a  href="https://play.vuejs.org/#eNp9VOFO2zAQfpVT9gOGmhZaqFjaVWIITezHNgGbNCl/3OSSGBLbs51ShvpQe4a92M52AmWr+BHF9n3+7r678z1GZ0oNVy1GSTQ3mebKgkHbqkUqeKOktvAIGgvYQKFlA3sE3UtFKuajgCYcbSw2qmYWaTfP+QqymhnzPo0yKSzjAnUagbEPNdKZxbWNWc1LkUCGwqKewZJld6WWrcjjTNZSJ/CmyIuiOJ2lEXECvGC13Na4xdhfwaPJ6RT7K3SpOlpcYdYq1AxsOx/R/tniYtPM4J/fzFvA+xmRo+BRLS5FqdG4q5BJrVGCYsT0s0VQLebMUGaMZcsaM9QBtUXpUkg0XKjWPoXudzE2jNckwD4oF3+/7fU0TJdcxEtprWwSODpU6xlxO5Gdxj4rSz3qFi1hadH7MUipDIdEvLgQK840nMucl3I+CgZXrE7ufLRVQdr6SGg59KmGR+ejpjrGFfKysgkcDk9mqdgQYsuTh+0oZV8XF19Q0RfX4aXOkVBCCpzB6ACusJErBFshdKoCBA5GDq9YnnNRhrTA2OeGbp3leW+CQmowimVuzYXh+Qu2QFNQqWLDfyERTTuOa7Qe6GzgbB02a7VxQpTkoV0Je14xUWJnAkutEYxAHiqKX/soGBWEZ3euRYAphdQ+Iutpg6xYs5y3hsI4GlMcwbCOTcVyeZ/ACYl0H+hyyfbH7wbgvuPxW4/0KgrW8Pohgb1rLCXCt8u9AdywSjZsAB9R4Ir+31HnTNDCMGFig5oXnoDalRJkuaTH6NcUdUPVHZv/y5uwzPIV+ir/+0p3F/50fDg9nj47cuSdH9drP/ZJcRCyLdl3gvdO/rcejHfcN+DEFd4d3PPcVrQ/6Q92NIgno4nVdXU0iKyht1rwcnhrpKDZ57ndJGkUr1F/US4lJo2S0PvOxupa3n/yZ1a3OOjPswqzux3nt2btztLoK00J1Ct6tE82Sy8cbTBfXH+mibhlbGTeuvn2ivEKjaxbF2OAfaCsU9hbOB/tpZ/glIwbc7G2SJXuRLlAHXLj8WlEU/38FenP4U6GE3+PMhpt/gKjWBoD">He olvidado mi contraseña</a>
      <br>
    </div>
      <button class="send-button"> INICIAR SESION</button> 
    </div>
  </div>
  
</div>
  
</template>

<style scoped>
.container {
  color: #e1386e;
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column; 
  background-color: #fdfff8;
}

h1{
    padding-top: 20px;
    font-weight: bold;
}
.logo{
    height: 200px;
    width: 200px;
    padding-top: 20px;
}
.login-input{
  
  color: #01ac93;
}
.password{
  margin-bottom: 5px;
}

.password-restore{
  font-size: 12px;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: left;
}

.password-title, .email-title{
  margin: 20px 0px 10px;
  font-weight: bold;
}
.login-input input{
  height: 50px;
  width: 260px;
  padding: 10px 20px;
  color:#e1386e;
}
.login-options{
  text-align: center;
}
.send-button{
  background-color: #e1386e;
  color:#fdfff8;
  border: none; /* Remove the button border */
  padding: 10px 20px; /* Add padding for spacing inside the button */
  font-size: 16px; /* Set the font size */
  cursor: pointer; /* Change cursor to pointer on hover for a clickable appearance */
  border-radius: 112px; /* Add rounded corners */
  box-shadow: 5px 5px  rgba(0, 0, 0, 1);
  transition: transform 0.2s;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
}
.send-button:active{
  transform: translateY(2px);
  background-color: #820646;
  box-shadow: none;
}
</style> -->
<template>
    <div class= "container">
    <h1>Login</h1>
    <img src="../assets/images/LogoOMB-sin-fondo.png">
    <form @submit.prevent="login">
      <div class="login-input">
        <div class="form-group">
            <label for="email">EMAIL</label>
            <input v-model="email" type="text" class="form-control" id="email" required />
        </div>
      
        <div class="form-group">
            <label for="password">CONTRASEÑA</label>
            <input v-model="password" type="password" class="form-control" id="password" required/>
        </div>
      </div>
      <!-- Other form elements -->
      <RouterLink to="/recover/email">
        <a class="nav-link" href="#" >He olvidado mi contraseña</a>
      </RouterLink>
      <br>
      <div class="login-options">
        <button type="submit" class="btn login-btn">INICIAR SESIÓN</button>  
      </div>
      
    </form>
    </div>
  </template>
  
<style scoped>
.container {
  color: #e1386e;
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column; 
  background-color: #fdfff8;
  margin-top: 20px;
}
img{
    height: 100px;
    width:100px;
}

h1{
    padding-top: 30px;
    padding:20px;
    font-weight: bold;
}
.login-input{
  color: #01ac93;
}
.form-control{
  margin-bottom: 5px;
}

a {
  font-size: 12px;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: left;
}
.login-input input{
  height: 50px;
  width: 260px;
  padding: 10px 20px;
  color:#e1386e;
  margin-top: 18px;
  margin-bottom: 18px;
}
.login-options{
  text-align: center;
}
.login-btn{
  background-color: #e1386e;
  color:#fdfff8;
  border: none; /* Remove the button border */
  padding: 10px 20px; /* Add padding for spacing inside the button */
  margin-top: 20px;
  font-size: 16px; /* Set the font size */
  cursor: pointer; /* Change cursor to pointer on hover for a clickable appearance */
  border-radius: 112px; /* Add rounded corners */
  box-shadow: 5px 5px  rgba(0, 0, 0, 1);
  transition: transform 0.2s;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.login-btn:hover{
    background-color: #e1386e;
    color:#fdfff8;
}
.login-btn:active{
  transform: translateY(2px);
  background-color: #820646 !important;
  box-shadow: none;
  color:#fdfff8 !important;
}
</style>
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      login() {
        // Handle form submission here
      },
    },
  };
  </script>
  