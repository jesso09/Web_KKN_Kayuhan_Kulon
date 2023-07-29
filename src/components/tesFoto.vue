<template>
  <section class="bg-image" style="width: 100%; height: 100vh">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div
            class="card"
            style="background-color: #e9edc9; border-radius: 1rem"
          >
            <p class="fs-1 fw-bold text-center">Tes Foto</p>
            <div class="row g-0">
              <div>
                <div v-for="anggota in foto" :key="anggota.id">
                  <img
                    :src="getFotoUrl(anggota.foto)"
                    alt="Foto"
                  />
                </div>
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div
                  class="card-body p-4 p-lg-5 text-black"
                  style="background-color: #e9edc9"
                >
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
                      <label class="form-label" for="role"
                        >Nama Jabatan (Misal RT 09)</label
                      >
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
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  setup() {
    const foto = ref([]);
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
        .post("http://127.0.0.1:8000/api/login", {
          role: role,
          password: password,
        })
        .then(() => {
          Swal.fire("Login Success!", "", "success");
        })
        .catch((error) => {
          validation.value = error.response.data.message;
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: validation.value,
            showConfirmButton: false,
            timer: 1000,
          });
        });
    }

    onMounted(() => {
      axios
        .get("http://127.0.0.1:8000/api/berita_dukuh")
        .then((response) => {
          //assign state posts with response data
          foto.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(foto.value);
        })
        .catch((error) => {
          console.log(error.response);
        });
    });

    function getFotoUrl(fileName) {
      return `http://localhost:8000/storage/images/${fileName}`;
    }

    return {
      logins,
      validation,
      router,
      login,
      passwordFieldIcon,
      passwordFieldType,
      hidePassword,
      foto,
      getFotoUrl,
    };
  },
};
</script>

<style></style>
