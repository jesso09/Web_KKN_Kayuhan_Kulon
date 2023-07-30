<template>
  <body>
    <header>
      <a href="/" style="text-decoration: none">
        <img src="@/assets/icon3.png" class="logo" />
      </a>
      <nav class="navigation">
        <a href="/">Home</a>
        <a href="/about" class="active">Tentang Kayuhan Kulon</a>
        <a href="/activity">Daftar Kegiatan</a>
      </nav>
    </header>

    <section class="parallax">
      <img src="@/assets/progoView.jpg" />
      <h2 id="text">TENTANG KAYUHAN KULON</h2>
      <img src="../assets/left_leaf.png" id="left_leaf" />
      <img src="../assets/leaf2.png" id="leaf" />
      <img src="../assets/plant2.png" id="plant" />
    </section>

    <section class="sec">
      <div v-motion-slide-visible-bottom>
        <h2>Struktur Organisasi Padukuhan</h2>
        <img src="@/assets/struktur.jpg" />
        <p>
          Pembuatan struktur organisasi pada sebuah padukuhan (atau desa)
          merupakan suatu proses penting dalam upaya meningkatkan pemerataan
          pembangunan, pelayanan, dan partisipasi masyarakat setempat. Struktur
          organisasi padukuhan mengacu pada susunan hierarki dan tugas pembagian
          yang diterapkan untuk mengatur aktivitas dan mengelola berbagai aspek
          kehidupan di tingkat lokal.
        </p>
        <p>
          Deskripsi struktur organisasi padukuhan dapat meliputi beberapa elemen
          utama. Pertama, kepala padukuhan atau lurah adalah sosok kepemimpinan
          utama yang bertanggung jawab atas pelaksanaan kebijakan dan
          pengambilan keputusan. Di bawah kepala padukuhan, terdapat dewan atau
          musyawarah padukuhan, yang berfungsi sebagai forum untuk musyawarah
          dan membahas isu-isu penting bersama dengan masyarakat.
        </p>
        <p>
          Selain itu, struktur organisasi padukuhan juga melibatkan peran kepala
          dusun atau ketua RT/RW yang bertanggung jawab untuk mengurus dan
          memfasilitasi kegiatan di tingkat lebih lokal. Mereka memiliki peran
          strategis dalam mengidentifikasi kebutuhan dan aspirasi masyarakat,
          mengelola data penduduk, serta menyampaikan informasi dari pemerintah
          desa ke masyarakat.
        </p>
      </div>
    </section>

    <section class="sec">
      <div v-motion-fade-visible>
        <h2>Geografis Padukuhan</h2>
        <img src="@/assets/Peta.jpg" />
        <p>
          Padukuhan Kayuhan Kulon adalah salah satu padukuhan yang terletak di
          Desa Triwidadi, Kecamatan Bantul, Yogyakarta, Indonesia. Padukuhan ini
          merupakan unit administratif terkecil di tingkat desa.Secara
          geografis, Padukuhan Kayuhan Kulon berada di bagian barat daya Desa
          Triwidadi. Padukuhan ini mungkin memiliki luas wilayah yang lebih
          kecil dibandingkan dengan padukuhan lainnya di desa tersebut, karena
          merupakan bagian dari suatu desa.
        </p>
      </div>
    </section>
  </body>

  <Footer></Footer>
</template>

<script>
import { onMounted } from "vue";
import Footer from "./globalFooter.vue";

export default {
  setup() {
    onMounted(() => {
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
    });
  },
  // components: { NavBar }
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
  background: #c58e4c;
  padding: 80px;
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
  text-align: justify;
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
  background: #c58e4c;
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
  box-shadow: 4px 4px 6px rgb(3, 163, 0, 1);
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
