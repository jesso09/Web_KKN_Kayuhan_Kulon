<template>
  <header>
      <a href="/" style="text-decoration: none;">
        <img src="@/assets/icon2.png" class="logo">
      </a>
      <nav class="navigation">
        <a href="#" class="active">Home</a>
        <a href="/geografis-padukuhan">Tentang Kayuhan Kulon</a>
        <a href="#">Pendidikan</a>
        <a href="#">DLL</a>
      </nav>
    </header>
</template>
<script>
export default {
  
};
</script>
<style>

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
  width: 60px; /* Set the desired width */
  height: auto; /* This will maintain the aspect ratio */
  color: #359381;
  pointer-events: none;
  margin-right: 270px;
}

.navigation a {
  text-decoration: none;
  color: #003329;
  padding: 6px 15px;
  border-radius: 20px;
  margin: 0 10px;
  font-weight: 600;
}

.navigation a:hover,
.navigation a.active {
  background: #003329;
  color: #fff;
}

</style>
