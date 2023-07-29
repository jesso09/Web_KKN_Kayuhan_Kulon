<template>
  <body>
    <header>
      <a href="/" style="text-decoration: none">
        <img src="@/assets/icon3.png" class="logo" />
      </a>
      <nav class="navigation">
        <a href="/">Home</a>
        <a href="/about">Tentang Kayuhan Kulon</a>
        <a href="/activity">Daftar Kegiatan</a>
      </nav>
    </header>

    <section class="parallax">
      <img src="../assets/hill1.png" id="hill1" />
      <img src="../assets/hill2.png" id="hill2" />
      <img src="@/assets/progoView.jpg" />
      <img src="../assets/hill4.png" id="hill4" />
      <img src="../assets/hill5.png" id="hill5" />
      <h2 id="text">Detail Post</h2>
      <img src="../assets/leaf.png" id="leaf" />
      <img src="../assets/plant.png" id="plant" />
    </section>

    <section class="sec">
      <h2>Detail Kegiatan</h2>
      <div class="card-container">
        <div class="card">
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
        .get(`https://kayuhankulon.kkn41uajy.cloud/kayuhan_kulon/public/api/berita_dukuh/${route.params.id}`)
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

        let text = document.getElementById("text");
        let leaf = document.getElementById("leaf");
        let hill4 = document.getElementById("hill4");
        let hill5 = document.getElementById("hill5");

        window.addEventListener("scroll", () => {
          let value = window.scrollY;
          text.style.marginTop = value * 2 + "px";
          leaf.style.top = value * -1.5 + "px";
          leaf.style.left = value * 1.5 + "px";
          hill5.style.left = value * 1.5 + "px";
          hill4.style.left = value * -1.5 + "px";
        });

      const now = new Date();
      bulan.value = now.toLocaleString("default", { month: "long" });
      tahun.value = now.getFullYear();
      tanggal.value = formatDate(now);
    });

    function getFotoUrl(fileName) {
      return `https://kayuhankulon.kkn41uajy.cloud/kayuhan_kulon/public/storage/images/${fileName}`;
    }
    function getVideo(fileName) {
      return `https://kayuhankulon.kkn41uajy.cloud/kayuhan_kulon/public/storage/videos/${fileName}`;
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
  justify-content: flex-start;
  align-items: center;
  z-index: 100;
}

.logo {
  width: 60px;
  height: auto;
  color: #359381;
  pointer-events: none;
  margin-right: 270px;
}

.navigation a {
  text-decoration: none;
  color: #359381;
  padding: 6px 15px;
  border-radius: 20px;
  margin: 0 10px;
  font-weight: 600;
}

.navigation a:hover,
.navigation a.active {
  background: #359381;
  color: #fff;
}

.parallax {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#text {
  position: absolute;
  font-size: 3.5em;
  color: #fff;
  text-shadow: 4px 4px 6px rgba(0, 51, 41, 1);
}

.parallax img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.sec {
  position: relative;
  background: #003329;
  padding: 100px;
}

.sec h2 {
  font-size: 3em;
  color: #fff;
  margin-bottom: 10px;
}
.sec p {
  font-size: 1.4em;
  color: #fff;
  font-weight: 300;
}

.sec img {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 800px;
  height: auto;
  border-radius: 1em;
}

.card-container {
  background: #003329;
  display: flex;
}

.card-container img {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 500px;
  height: 600px;
  border-radius: 1em;
}

.card-container::-webkit-scrollbar {
  display: none;
}

.card {
  flex: 0 0 auto;
  align-items: center;
  width: 1300px;
  margin: 0 10px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 30px 30px 30px 30px;
  box-shadow: 4px 4px 6px rgb(3, 163, 0, 1);
}

.card video {
    width: 800px;
    height: 500px;
}

.card h2 {
  color: #000;
}

.card h6 {
  font-size: 16px;
  color: rgb(0, 0, 0, 0.5);
}

.card p {
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
