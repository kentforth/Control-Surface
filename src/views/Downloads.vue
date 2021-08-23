<template>
  <div class="container">
    <div class="files">
      <h1>Downloads</h1>
      <div class="files-list">
        <div class="files-list__item" v-for="file in files" :key="file.id">
          <h2>{{ file.title }}</h2>
          <img :src="file.image" :alt="file.title" />
          <Button
            :text="button.text"
            class="btn-download"
            @click="downloadFile(file.id)"
          >
            <fa icon="save" type="fas" class="icon github-icon"></fa>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "Downloads",
  components: { Button },
  data: () => ({
    button: {
      text: "Download"
    },

    files: [
      {
        id: 1,
        title: "Arduino Midi Documentation",
        image: require("../assets/images/files/arduino midi documentation.webp")
      },
      {
        id: 2,
        title: "Decimal and Hexidecimal Midi Table",
        image: require("../assets/images/files/hex table.webp")
      },
      {
        id: 3,
        title: "Device Class Definition for Midi Devices",
        image: require("../assets/images/files/device class definition.webp")
      },
      {
        id: 4,
        title: "Midi CC Controller Numbers",
        image: require("../assets/images/files/midi cc controller numbers.webp")
      },
      {
        id: 5,
        title: "Midi Data Conversion Chart",
        image: require("../assets/images/files/midi data conversion.webp")
      },
      {
        id: 6,
        title: "Midi Messages Docs",
        image: require("../assets/images/files/midi messages docs.webp")
      },
      {
        id: 7,
        title: "Note Numbers",
        image: require("../assets/images/files/note numbers.webp")
      },
      {
        id: 8,
        title: "Shift Register 74HC595 Docs",
        image: require("../assets/images/files/shift register docs.webp")
      }
    ]
  }),
  methods: {
    downloadFile(id) {
      let fileName = "";
      switch (id) {
        case 1:
          fileName = "Arduino Midi Documentation.pdf";
          break;
        case 2:
          fileName = "Decimal and Hexidecimal Midi Table.jpg";
          break;
        case 3:
          fileName = "Device Class Definition for Midi Devices.pdf";
          break;
        case 4:
          fileName = "Midi CC Controller Numbers.pdf";
          break;
        case 5:
          fileName = "MIDI Data Conversion Chart.pdf";
          break;
        case 6:
          fileName = "Midi Messages Docs.pdf";
          break;
        case 7:
          fileName = "Note Numbers.png";
          break;
        case 8:
          fileName = "Shit Register - 74HC_HCT595 docs.pdf";
          break;
      }
      const link = document.createElement("a");
      link.href = fileName;
      link.setAttribute("download", fileName);
      link.click();
    }
  }
};
</script>

<style scoped lang="scss">
.files {
  padding: 7em 0 2em 0;

  h1 {
    text-align: center;
    color: $white;
  }

  @include responsive(tab-port) {
    padding-top: 10em;
  }

  @include responsive(phone) {
    padding-top: 4em;
  }

  .files-list {
    display: grid;
    grid-gap: rem(60px);
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

    &__item {
      display: grid;
      align-content: space-between;

      h2 {
        color: $blue-light;
        font-size: rem(35px);
      }

      img {
        max-width: 100%;
      }

      .btn-download {
        color: $white;
        background-color: $turquoise;
        margin: 1em auto 0 auto;
        display: flex;
        justify-items: center;
        justify-content: center;
        align-content: flex-start;
        position: relative;
        width: 100%;

        .icon {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
