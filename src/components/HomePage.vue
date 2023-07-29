<template>
  <body>
    <header>
      <a href="/" style="text-decoration: none">
        <img src="@/assets/icon3.png" class="logo" />
      </a>
      <nav class="navigation">
        <a href="/" class="active">Home</a>
        <a href="/about">Tentang Kayuhan Kulon</a>
        <a href="/activity">Daftar Kegiatan</a>
      </nav>
    </header>

    <section class="parallax">
      <img src="@/assets/progoView.jpg" />
      <h2 id="text">KAYUHAN KULON</h2>
      <img src="../assets/left_leaf.png" id="left_leaf" />
      <img src="../assets/leaf2.png" id="leaf" />
      <img src="../assets/plant2.png" id="plant" />
    </section>

    <section class="sec">
      <div v-motion-slide-visible-bottom>
        <h2>Kayuhan Kulon</h2>
        <p>
          Kayuhan Kulon adalah padukuhan yang terletak di Desa Triwidadi,
          Kecamatan Pajangan, Kabupaten Bantul dan berbatasan dengan Sungai
          Progo. Kayuhan Kulon memiliki wilayah yang memanjang dari arah utara
          ke arah selatan dan memiliki 5 RT. Mayoritas masyarakatnya sebagai
          petani jagung, emping, dan tebu, serta masyarakat Kayuhan Kulon ramah
          dan saling gotong royong.
        </p>
      </div>
    </section>

    <section class="sec" v-if="berita_dukuh != null">
      <h2>Kegiatan Baru ini.</h2>
      <div class="card-container" v-motion-slide-visible-bottom>
        <swiper :slides-per-view="3"
    :space-between="600">
          <swiper-slide
            v-for="(post, id) in berita_dukuh"
            :key="id"
          >
          <div class="card">
            <img :src="getFotoUrl(post.foto)" />
            <router-link
              :to="{
                name: 'detail_post',
                params: { id: post.id },
              }"
              class="judul"
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
          </swiper-slide>
          <swiper-slide>
          <div>
          </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>

    <section class="sec">
      <div v-motion-fade-visible>
        <h2>Google Maps</h2>
        <a
          href="https://www.google.com/maps/place/Masjid+Al-Muttaqin+Kayuhan+Kulon/@-7.8613506,110.2541627,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7af96af9e337c7:0x5165a086012c7401!8m2!3d-7.8613506!4d110.2567376!16s%2Fg%2F11cn5q8mkq?entry=ttu"
        >
          <img src="@/assets/gmaps.png" />
        </a>
        <p>
          Klik gambar diatas untuk membuka peta (google maps) ke Padukuhan
          Kayuhan Kulon
        </p>
      </div>
    </section>

    <section class="sec">
      <h2>Profil Pengembang</h2>
      <div class="card-container-profile" v-motion-slide-visible-bottom>
        <div class="card-profile" v-for="(data, id) in profiles" :key="id">
          <img :src="data.foto" class="pict" />
          <h3>{{ data.name }}</h3>
          <a v-if="data.linkIg" :href="data.linkIg" class="text-info">
            <img src="@/assets/instagram.png" class="icon" />
            <p>{{ data.ig }}</p>
          </a>
          <a v-if="data.linkLI" :href="data.linkLI" class="text-info">
            <img src="@/assets/linkedin.png" class="icon" />
            <p>{{ data.linkedin }}</p>
          </a>
        </div>
      </div>
    </section>
  </body>

  <Footer> </Footer>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Footer from "./globalFooter.vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default {
  setup() {
    let berita_dukuh = ref([]);
    const tanggal = ref("");
    const bulan = ref("");
    const tahun = ref("");
    let profiles = ref([
      {
        name: "Gede Bagus Jyestha Permana",
        foto: require("@/assets/jesso.png"),
        linkIg: "https://www.instagram.com/jyestha_p/",
        ig: "jyestha_p",
        linkLI: "https://www.linkedin.com/in/jyestha-permana-a522b01b6/",
        linkedin: "Jyestha Permana",
      },
      {
        name: "Hanwyn Tang",
        foto: require("@/assets/hanwyn.jpg"),
        linkIg: "https://www.instagram.com/hanwyn_01/",
        ig: "hanwyn_01",
        linkLI: "https://www.linkedin.com/in/hanwyn-tang-99b350173/",
        linkedin: "Hanwyn Tang",
      },
    ]);

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
          "https://kayuhankulon.kkn41uajy.cloud/kayuhan_kulon/public/api/berita_dukuh"
        )
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

    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };

    return {
      berita_dukuh,
      getFotoUrl,
      tanggal,
      bulan,
      tahun,
      formatDate,
      profiles,
      onSwiper,
      onSlideChange,
    };
  },
  components: { Footer, Swiper, SwiperSlide },
  modules: [Navigation, Pagination, Scrollbar, A11y],
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
  font-size: 5em;
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
  background: #c58e4c;
  padding: 100px;
}

.judul {
  text-decoration: none;
  font-size: 1.5em;
  color: #000;
  margin-bottom: 10px;
}

.judul h3:hover {
  color: #c58e4c;
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
  width: 500px;
  height: auto;
  border-radius: 1em;
}

.card-container .swiper{
  overflow-x: auto;
  background: #c58e4c;
  display: flex;
}

.card-container img {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 400px;
  height: 500px;
  border-radius: 1em;
}

.card-container .swiper::-webkit-scrollbar {
  display: none;
}

.card {
  flex: 0 0 auto;
  align-items: center;
  width: 600px;
  height: 900px;
  margin: 0 10px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 30px 0px 30px 0px;
  box-shadow: 4px 4px 6px rgba(46, 29, 12, 1);
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
  background-color: rgb(43, 38, 38, 1);
  font-size: 14px;
  color: white;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.footer img {
  margin-left: 20px;
  width: 35px;
  height: auto;
}

.card-container-profile {
  align-items: center;
  justify-content: center;
  /* background: #003329; */
  background: #c58e4c;
  display: flex;
}

.card-profile .pict {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 260px;
  height: 290px;
  border-radius: 1em;
}

.card-profile .icon {
  margin-top: 5px;
  margin-right: 10px;
  width: 23px;
  height: auto;
}

.card-profile {
  flex: 0 0 auto;
  align-items: center;
  width: 300px;
  margin: 0 10px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 30px 30px 30px 30px;
  box-shadow: 4px 4px 6px rgba(46, 29, 12, 1);
}

.card-profile h3 {
  font-size: 14px;
  color: #000;
}

.card-profile .text-info {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  color: #000;
}

.card-profile p {
  font-size: 14px;
  color: #000;
}
</style>
