<template>
    <section
      class="bg-image"
      style="
        /* background-image: url('https://htmlcolorcodes.com/assets/images/colors/light-green-color-solid-background-1920x1080.png'); */
        width: flexible;
        height: 100vh;
      "
    >
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style="background-color: #E9EDC9; border-radius: 1rem" >
              <p class="fs-1 fw-bold text-center">Kayuhan Kulon</p>
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                    alt="login form"
                    class="img-fluid"
                    style="border-radius: 1rem 0 0 1rem"
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black" style="background-color: #E9EDC9;">
                    <form @submit.prevent="login">
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <i
                          class="fas fa-cubes fa-2x me-3"
                          style="color: #ff6219"
                        ></i>
                        <span class="h1 mb-0">Login</span>
                      </div>
  
                      <div class="form-outline mb-4">
                        <input
                          type="role"
                          id="role"
                          class="form-control form-control-lg"
                          v-model="logins.role"
                        />
                        <label class="form-label" for="role">Nama Jabatan (Misal RT 09)</label>
                      </div>
  
                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          class="form-control form-control-lg"
                          v-model="logins.password"
                        />
                        <label class="form-label" for="password">Password</label>
                      </div>
  
                      <div class="pt-1 mb-4 text-center">
                        <button
                          class="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { reactive, ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    setup() {
      const hidePassword = ref(true);
      const passwordFieldIcon = computed(() => ({
        "fa-eye": hidePassword.value,
        "fa-eye-slash": !hidePassword.value,
      }));
  
      const passwordFieldType = computed(() =>
        hidePassword.value ? "password" : "text"
      );
      const logins = reactive({
        role: "",
        password: "",
      });
      const validation = ref([]);
      const router = useRouter();
  
      function login() {
        let role = logins.role;
        let password = logins.password;
        axios
          .post('http://127.0.0.1:8000/api/login', {
            role: role,
            password: password,
          })
          .then(() => {
              Swal.fire("Login Success!", "", "success");
          })
          .catch((error) => {
            validation.value = error.response.data.message;
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: validation.value,
              showConfirmButton: false,
              timer: 1000
              })
          });
      }
  
      return {
        logins,
        validation,
        router,
        login,
        passwordFieldIcon,
        passwordFieldType,
        hidePassword,
      };
    },
  };
  </script>

  <style>
  </style>