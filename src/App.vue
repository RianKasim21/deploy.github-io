<template>
  <div id="app">
    <h1>Form Penerima Bantuan Sosial</h1>

    <form v-if="!submitted" @submit.prevent="submitForm">
      <!-- Nama -->
      <div>
        <label for="nama">Nama Lengkap</label>
        <input type="text" id="nama" v-model="formData.nama" required />
      </div>

      <!-- NIK -->
      <div>
        <label for="nik">NIK</label>
        <input type="number" id="nik" v-model="formData.nik" required />
      </div>

      <!-- Nomor Kartu Keluarga -->
      <div>
        <label for="kk">Nomor Kartu Keluarga</label>
        <input type="number" id="kk" v-model="formData.kk" required />
      </div>

      <!-- Foto KTP -->
      <div>
        <label for="fotoKTP">Foto KTP</label>
        <input type="file" id="fotoKTP" @change="onFileChange($event, 'fotoKTP')" accept="image/*" required />
      </div>

      <!-- Foto Kartu Keluarga -->
      <div>
        <label for="fotoKK">Foto Kartu Keluarga</label>
        <input type="file" id="fotoKK" @change="onFileChange($event, 'fotoKK')" accept="image/*" required />
      </div>

      <!-- Umur -->
      <div>
        <label for="umur">Umur</label>
        <input type="number" id="umur" v-model="formData.umur" required />
      </div>

      <!-- Jenis Kelamin -->
      <div>
        <label for="jenisKelamin">Jenis Kelamin</label>
        <select id="jenisKelamin" v-model="formData.jenisKelamin" required>
          <option value="" disabled selected>Pilih Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      <!-- Provinsi -->
      <div>
        <label for="provinsi">Provinsi</label>
        <select id="provinsi" v-model="formData.provinsi" @change="onProvinsiChange" required>
          <option value="" disabled selected>Pilih Provinsi</option>
          <option v-for="provinsi in provinsiList" :key="provinsi.id" :value="provinsi.id">{{ provinsi.name }}</option>
        </select>
      </div>

      <!-- Kabupaten/Kota -->
      <div>
        <label for="kabupaten">Kabupaten/Kota</label>
        <select id="kabupaten" v-model="formData.kabupaten" @change="onKabupatenChange" required>
          <option value="" disabled selected>Pilih Kabupaten/Kota</option>
          <option v-for="kabupaten in kabupatenList" :key="kabupaten.id" :value="kabupaten.id">{{ kabupaten.name }}</option>
        </select>
      </div>

      <!-- Kecamatan -->
      <div>
        <label for="kecamatan">Kecamatan</label>
        <select id="kecamatan" v-model="formData.kecamatan" @change="onKecamatanChange" required>
          <option value="" disabled selected>Pilih Kecamatan</option>
          <option v-for="kecamatan in kecamatanList" :key="kecamatan.id" :value="kecamatan.id">{{ kecamatan.name }}</option>
        </select>
      </div>

      <!-- Kelurahan/Desa -->
      <div>
        <label for="kelurahan">Kelurahan/Desa</label>
        <select id="kelurahan" v-model="formData.kelurahan" @change="onKelurahanChange" required>
          <option value="" disabled selected>Pilih Kelurahan</option>
          <option v-for="kelurahan in kelurahanList" :key="kelurahan.id" :value="kelurahan.id">{{ kelurahan.name }}</option>
        </select>
      </div>

      <!-- Alamat -->
      <div>
        <label for="alamat">Alamat</label>
        <input type="text" id="alamat" v-model="formData.alamat" maxlength="255" required />
      </div>

      <!-- RT/RW -->
      <div>
        <label for="rt">RT</label>
        <input type="text" id="rt" v-model="formData.rt" required />
      </div>
      <div>
        <label for="rw">RW</label>
        <input type="text" id="rw" v-model="formData.rw" required />
      </div>

      <!-- Penghasilan Sebelum Pandemi -->
      <div>
        <label for="penghasilanSebelum">Penghasilan Sebelum Pandemi</label>
        <input type="number" id="penghasilanSebelum" v-model="formData.penghasilanSebelum" required />
      </div>

      <!-- Penghasilan Setelah Pandemi -->
      <div>
        <label for="penghasilanSetelah">Penghasilan Setelah Pandemi</label>
        <input type="number" id="penghasilanSetelah" v-model="formData.penghasilanSetelah" required />
      </div>

      <!-- Alasan Membutuhkan Bantuan -->
      <div>
        <label for="alasan">Alasan Membutuhkan Bantuan</label>
        <select id="alasan" v-model="formData.alasan" required>
          <option value="" disabled selected>Pilih Alasan</option>
          <option value="Kehilangan pekerjaan">Kehilangan pekerjaan</option>
          <option value="Kepala keluarga">Kepala keluarga</option>
          <option value="Tergolong fakir/miskin">Tergolong fakir/miskin</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <!-- Checkbox Verifikasi -->
      <div>
        <input type="checkbox" v-model="isChecked" required />
        <label>Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.</label>
      </div>

      <button type="submit">Submit</button>
    </form>

    <!-- Preview Data -->
    <div v-if="submitted">
      <h2>Preview Data</h2>
      <pre>{{ formattedFormData }}</pre>
      <button @click="resetForm">Kembali ke Form</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        nama: '',
        nik: '',
        kk: '',
        fotoKTP: null,
        fotoKK: null,
        umur: '',
        jenisKelamin: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        alamat: '',
        rt: '',
        rw: '',
        penghasilanSebelum: '',
        penghasilanSetelah: '',
        alasan: ''
      },
      // Variabel untuk menyimpan nama wilayah
      provinsiName: '',
      kabupatenName: '',
      kecamatanName: '',
      kelurahanName: '',
      provinsiList: [],
      kabupatenList: [],
      kecamatanList: [],
      kelurahanList: [],
      isChecked: false,
      submitted: false,
      submitStatus: ''
    };
  },
  computed: {
    formattedFormData() {
      return {
        ...this.formData,
        provinsi: this.provinsiName,
        kabupaten: this.kabupatenName,
        kecamatan: this.kecamatanName,
        kelurahan: this.kelurahanName
      };
    },
  },
  methods: {
    fetchProvinsi() {
      axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
        .then(response => {
          this.provinsiList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchKabupaten() {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${this.formData.provinsi}.json`)
        .then(response => response.json())
        .then(kabupaten => {
          this.kabupatenList = kabupaten;
        })
        .catch(error => console.error('Error fetching kabupaten:', error));
    },
    fetchKecamatan() {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${this.formData.kabupaten}.json`)
        .then(response => response.json())
        .then(kecamatan => {
          this.kecamatanList = kecamatan;
        })
        .catch(error => console.error('Error fetching kecamatan:', error));
    },
    fetchKelurahan() {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${this.formData.kecamatan}.json`)
        .then(response => response.json())
        .then(kelurahan => {
          this.kelurahanList = kelurahan;
        })
        .catch(error => console.error('Error fetching kelurahan:', error));
    },
    onProvinsiChange() {
      const selectedProvinsi = this.provinsiList.find(prov => prov.id === this.formData.provinsi);
      this.provinsiName = selectedProvinsi ? selectedProvinsi.name : '';
      this.fetchKabupaten();
    },
    onKabupatenChange() {
      const selectedKabupaten = this.kabupatenList.find(kab => kab.id === this.formData.kabupaten);
      this.kabupatenName = selectedKabupaten ? selectedKabupaten.name : '';
      this.fetchKecamatan();
    },
    onKecamatanChange() {
      const selectedKecamatan = this.kecamatanList.find(kec => kec.id === this.formData.kecamatan);
      this.kecamatanName = selectedKecamatan ? selectedKecamatan.name : '';
      this.fetchKelurahan();
    },
    onKelurahanChange() {
      const selectedKelurahan = this.kelurahanList.find(kel => kel.id === this.formData.kelurahan);
      this.kelurahanName = selectedKelurahan ? selectedKelurahan.name : '';
      this.fetchKelurahan();
    },
    onFileChange(event, field) {
      const file = event.target.files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
        this.formData[field] = file.name;  // Simpan nama file
        this.formData[field + 'File'] = file; // Simpan objek file jika perlu untuk pengiriman
      } else {
        alert("File terlalu besar. Maksimal 2MB.");
      }
    },
    submitForm() {
      this.submitted = true;
      // Simulasi pengiriman data
      setTimeout(() => {
        const success = Math.random() > 0.5;
        this.submitStatus = success ? "Pengiriman Sukses!" : "Pengiriman Gagal. Coba lagi.";
      }, 1500);
    },
    resetForm() {
      this.submitted = false;
      this.formData = {
        nama: '',
        nik: '',
        kk: '',
        fotoKTP: null,
        fotoKK: null,
        umur: '',
        jenisKelamin: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        alamat: '',
        rt: '',
        rw: '',
        penghasilanSebelum: '',
        penghasilanSetelah: '',
        alasan: ''
      };
      this.isChecked = false;
      // Reset nama wilayah
      this.provinsiName = '';
      this.kabupatenName = '';
      this.kecamatanName = '';
      this.kelurahanName = '';
    }
  }, 
  mounted() {
    this.fetchProvinsi();
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f7f6;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

}

#app {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input[type="text"],
input[type="number"],
input[type="file"],
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="file"]:focus,
select:focus {
  border-color: #6c63ff;
  outline: none;
}

button {
  padding: 12px 20px;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #5a55d6;
}

pre {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
}

input[type="checkbox"] {
  margin-right: 10px;
}

button[type="submit"]:hover {
  background-color: #4f48c4;
}

div {
  margin-bottom: 10px;
}

h2 {
  text-align: center;
  margin-top: 30px;
}


  button {
    padding: 10px 16px;
    font-size: 14px;
  }


</style>
