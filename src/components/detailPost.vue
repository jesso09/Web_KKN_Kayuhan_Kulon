<template>
  <body>
    <header>
      <nav class="nav">
        <a href="/" style="text-decoration: none">
        <img src="@/assets/icon3.png" class="logo" />
      </a>
        <a href="/">Home</a>
        <a href="/about">Tentang Kayuhan Kulon</a>
        <a href="/activity">Daftar Kegiatan</a>
      </nav>
    </header>

    <section class="sec-post">
      <h2>Detail Kegiatan</h2>
      <div class="container">
        <div class="card-detail">
            <img :src="getFotoUrl(post.foto)" />
          <h2>{{ post.judul }}</h2>
          <h3>{{ post.topik }}</h3>
          <p>{{ post.deskripsi }}</p>
          <div class="pt-1 mb-4 text-center"></div>

          <div v-if="post.foto_cadangan_1 != null">
            <img :src="getFotoUrl(post.foto_cadangan_1)" />
          </div>
          <div v-if="post.deskripsi_cadangan_1 != null">
            <p>{{ post.deskripsi_cadangan_1 }}</p>
          </div>
          <div v-if="post.foto_cadangan_2 != null">
            <img :src="getFotoUrl(post.foto_cadangan_2)" />
          </div>
          <div v-if="post.deskripsi_cadangan_2 != null">
            <p>{{ post.deskripsi_cadangan_2 }}</p>
          </div>
          <div v-if="post.video != null">
            <h4>Video kegiatan</h4>
            <video controls :src="getVideo(post.video)"></video>
          </div>
          <h6>Dibuat tanggal {{ formatDate(new Date(post.created_at)) }}</h6>
          <h6>Diubah tanggal {{ formatDate(new Date(post.updated_at)) }}</h6>
        </div>
      </div>
    </section>
  </body>

  <Footer></Footer>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Footer from "./globalFooter.vue";

export default {
  setup() {
    const post = reactive({});
    const router = useRouter();
    //vue route
    const route = useRoute();
    const tanggal = ref("");
    const bulan = ref("");
    const tahun = ref("");

    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const hour = date.getHours().toString().padStart(2, "0");
      const minute = date.getMinutes().toString().padStart(2, "0");

      return `${day} ${month} ${year} (${hour}:${minute})`;
    };

    onMounted(() => {
      
      axios
        .get(
          `https://kayuhankulon.kkn41uajy.cloud/kayuhan_kulon/public/api/berita_dukuh/${route.params.id}`
        )
        .then((response) => {
          post.judul = response.data.data.berita_dukuh.judul;
          post.deskripsi = response.data.data.berita_dukuh.deskripsi;
          post.deskripsi_cadangan_1 =
            response.data.data.berita_dukuh.deskripsi_cadangan_1;
          post.deskripsi_cadangan_2 =
            response.data.data.berita_dukuh.deskripsi_cadangan_2;
          post.topik = response.data.data.berita_dukuh.topik;
          post.foto = response.data.data.berita_dukuh.foto;
          post.foto_cadangan_1 =
            response.data.data.berita_dukuh.foto_cadangan_1;
          post.foto_cadangan_2 =
            response.data.data.berita_dukuh.foto_cadangan_2;
          post.video = response.data.data.berita_dukuh.video;
          post.created_at = response.data.data.berita_dukuh.created_at;
          post.updated_at = response.data.data.berita_dukuh.updated_at;
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      const now = new Date();
      bulan.value = now.toLocaleString("default", { month: "long" });
      tahun.value = now.getFullYear();
      tanggal.value = formatDate(now);
    });

    function getFotoUrl(fileName) {
      return `https://kayuhankulon.kkn41uajy.cloud/kayuhan_kulon/storage/app/public/images/${fileName}`;
    }
    function getVideo(fileName) {
      return `https://kayuhankulon.kkn41uajy.cloud/kayuhan_kulon/storage/app/public/videos/${fileName}`;
    }

    return {
      post,
      router,
      getFotoUrl,
      getVideo,
      tanggal,
      bulan,
      tahun,
      formatDate,
    };
  },
  components: { Footer },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background: #f9f9f9;
  min-height: 100vh;
  overflow-x: hidden;
}

header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 30px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  /* position: fixed; */
}

.logo {
  width: 120px;
  height: auto;
  pointer-events: none;
  margin-right: 20px;
}

.nav{
  position: fixed;
  background-color: rgb(197, 142, 76, 0.75);
  border-radius: 40px;
}

.nav a {
  text-decoration: none;
  color: #362110;
  padding: 6px 15px;
  border-radius: 20px;
  margin: 0 10px;
  font-weight: 600;
}

.nav a:hover,
.nav a.active {
  background: #362110;
  color: #fff;
}

#text {
  position: absolute;
  font-size: 3.5em;
  color: #fff;
  text-shadow: 4px 4px 6px rgba(0, 51, 41, 1);
}

.sec-post {
  position: relative;
  /* background: #c58e4c; */
  background-image: url('../assets/progoView.jpg');
  padding: 100px;
  background-size: cover; /* atau "contain" */
}

.sec-post h2 {
  font-size: 3em;
  color: #fff;
  margin-bottom: 10px;
}

.container {
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-detail img {
  margin-left: 350px;
  margin-right: 350px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 500px;
  height: 600px;
  border-radius: 1em;
}

.card-detail {
  margin: 0 10px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 30px 30px 30px 30px;
  box-shadow: 4px 4px 6px rgba(46, 29, 12, 1);
}

.card-detail video {
  margin-left: 220px;
  margin-right: 220px;
  width: 800px;
  height: 500px;
}

.card-detail h2, h4, h3{
  text-align: center;
  color: #000;
}

.card-detail h6 {
  margin-left: 180px;
  margin-right: 180px;
  font-size: 16px;
  color: rgb(0, 0, 0, 0.5);
}

.card-detail p {
  text-align: justify;
  margin-left: 180px;
  margin-right: 180px;
  color: #000;
}

.footer {
  background-color: rgb(43, 38, 38);
  font-size: 14px;
  color: white;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
