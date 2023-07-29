<template>
  <body>
    <header>
      <a href="/" style="text-decoration: none">
        <img src="@/assets/icon3.png" class="logo" />
      </a>
      <nav class="navigation">
        <a href="/">Home</a>
        <a href="/about">Tentang Kayuhan Kulon</a>
        <a href="/activity"  class="active">Daftar Kegiatan</a>
      </nav>
    </header>

    <section class="parallax">
      <img src="@/assets/progoView.jpg" />
      <h2 id="text">DAFTAR KEGIATAN</h2>
      <img src="../assets/left_leaf.png" id="left_leaf" />
      <img src="../assets/leaf2.png" id="leaf" />
      <img src="../assets/plant2.png" id="plant" />
    </section>

    <section class="sec">
      <h2>Pendidikan</h2>
      <div class="card-container" v-motion-slide-visible-bottom>
        <div
          v-for="(post, id) in filteredBerita('Pendidikan')"
          :key="id"
          class="card"
        >
          <img :src="getFotoUrl(post.foto)" />
          <router-link
              :to="{
                name: 'detail_post',
                params: { id: post.id },
              }" class="judul"
            >
            <h3>{{ post.judul }}</h3>
          </router-link>
          <h6>{{ formatDate(new Date(post.created_at)) }}</h6>
          <p>{{ post.deskripsi }}</p>
          <div class="pt-1 mb-4 text-center">
            <router-link
              :to="{
                name: 'detail_post',
                params: { id: post.id },
              }"
              class="btn btn-outline-success"
            >
              Baca Selengkapnya
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="sec">
      <h2>Inovasi</h2>
      <div class="card-container" v-motion-slide-visible-bottom>
        <div
          v-for="(post, id) in filteredBerita('Inovasi')"
          :key="id"
          class="card"
        >
          <img :src="getFotoUrl(post.foto)" />
          <router-link
              :to="{
                name: 'detail_post',
                params: { id: post.id },
              }" class="judul"
            >
            <h3>{{ post.judul }}</h3>
          </router-link>
          <h6>{{ formatDate(new Date(post.created_at)) }}</h6>
          <p>{{ post.deskripsi }}</p>
          <div class="pt-1 mb-4 text-center">
            <router-link
              :to="{
                name: 'detail_post',
                params: { id: post.id },
              }"
              type="button"
              class="btn btn-outline-success"
            >
              Baca Selengkapnya
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="sec">
      <h2>Lingkungan</h2>
      <div class="card-container" v-motion-slide-visible-bottom>
        <div
          v-for="(post, id) in filteredBerita('Lingkungan')"
          :key="id"
          class="card"
        >
          <img :src="getFotoUrl(post.foto)" />
          <router-link
              :to="{
                name: 'detail_post',
                params: { id: post.id },
              }" class="judul"
            >
            <h3>{{ post.judul }}</h3>
          </router-link>
          <h6>{{ formatDate(new Date(post.created_at)) }}</h6>
          <p>{{ post.deskripsi }}</p>
          <div class="pt-1 mb-4 text-center">
            <router-link
              :to="{
                name: 'detail_post',
                params: { id: post.id },
              }"
              class="btn btn-outline-success"
            >
              Baca Selengkapnya
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </body>

  <Footer></Footer>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import Footer from "./globalFooter.vue"

export default {
  setup() {
    let berita_dukuh = ref([]);
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
      .get("https://kayuhankulon.kkn41uajy.cloud/kayuhan_kulon/public/api/berita_dukuh")
        .then((response) => {
          berita_dukuh.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });

        let text = document.getElementById("text");
      let plant = document.getElementById("plant");
      let leaf = document.getElementById("leaf");
      let left_leaf = document.getElementById("left_leaf");

      window.addEventListener("scroll", () => {
        let value = window.scrollY;
        text.style.marginTop = value * 1.5 + "px";
        plant.style.marginTop = value * 0.3 + "px";
        leaf.style.top = value * -1.5 + "px";
        leaf.style.left = value * 1.5 + "px";
        left_leaf.style.top = value * -1.5 + "px";
        left_leaf.style.right = value * 2 + "px";
      });

      const now = new Date();
      bulan.value = now.toLocaleString("default", { month: "long" });
      tahun.value = now.getFullYear();
      tanggal.value = formatDate(now);
    });

    function getFotoUrl(fileName) {
      return `https://kayuhankulon.kkn41uajy.cloud/kayuhan_kulon/public/storage/images/${fileName}`;
    }

    const filteredBerita = (topic) => {
      return berita_dukuh.value.filter((post) => post.topik === topic);
    };

    return {
      berita_dukuh,
      getFotoUrl,
      tanggal,
      bulan,
      tahun,
      formatDate,
      filteredBerita,
    };
  },
  components: { Footer }
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
}

.logo {
  width: 120px;
  height: auto;
  pointer-events: none;
  margin-right: 20px;
}

.navigation a {
  text-decoration: none;
  color: #362110;
  padding: 6px 15px;
  border-radius: 20px;
  margin: 0 10px;
  font-weight: 600;
}

.navigation a:hover,
.navigation a.active {
  background: #362110;
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
  text-shadow: 4px 4px 6px rgba(46, 29, 12, 1);
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
  background: #C58E4C;
  padding: 100px;
}

.sec h2 {
  font-size: 3em;
  color: #fff;
  margin-bottom: 10px;
}

.judul {
  text-decoration: none;
  font-size: 1.5em;
  color: #000;
  margin-bottom: 10px;
}

.judul h3:hover {  
  color: #C58E4C;
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
  overflow-x: auto;
  background: #C58E4C;
  display: flex;
}

.card-container img {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 500px;
  height: 400px;
  border-radius: 1em;
}

.card-container::-webkit-scrollbar {
  display: none;
}

.card {
  flex: 0 0 auto;
  align-items: center;
  width: 600px;
  margin: 0 10px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 30px 0px 30px 0px;
  box-shadow: 4px 4px 6px rgb(46, 29, 12, 1);
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
