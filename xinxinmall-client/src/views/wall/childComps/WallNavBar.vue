<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="nav-center">
      <input type="text" v-model="placeVlaue" class="wall-form-input" placeholder="连衣裙" @focus="focusSearch">
    </div>
    <div slot="right" class="right-search">
      <i></i>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'WallNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      isActive: false,
      placeVlaue: ''
    }
  },
  mounted() {
    this.$bus.$on('searchVla1', (msg) => {
      this.placeVlaue = msg
    })
  },
  methods: {
    backClick () {
      this.$router.back()
    },
    focusSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
.back img {
  position: relative;
  top: 6px;
  left: 18px;
}

.nav-center {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.wall-form-input {
  display: block;
  width: 98%;
  height: 90%;
  padding-left: 25px;
  outline: none;
  font-size: 14px;
  color: #333;
  border: none;
  background: #eee url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAAQlBMVEUAAAC8vLy8vLz///+8vLy8vLy8vLy+vr67u7u7u7u9vb2+vr6/v7/ExMTDw8PCwsK+vr68vLy7u7u8vLy+vr67u7v4YfcLAAAAFXRSTlMAnNsB8222J/q8ZT8cGhEMTsLwozoqaKd7AAAAuUlEQVQoz72SyxbDIAhE1fiIRmNe/P+vdhaxtZxUdr0rkREHRd1k5421xrusHih6pptZF8XZLHXYjaUdgZhCrSFFAu77NHbM0qLFIOwrFBTf10+87rii86BxGulOgAr6HWU4R/GeBV3kzlxUjNhZ9ESJ5xORb2tcFng+wFJbw33l+YoOpLxUX/In9Se9z/h9z/H/HGX8v34azQfQ0+/5OnwTPM7nWSbNBHy+mYDxT4ESBJcgCGrEFdQLlUURxlykoysAAAAASUVORK5CYII=) no-repeat 0.15rem center;
  background-size: 20px auto;
  border-radius: 5px;
}

.right-search {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.right-search>i {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url("data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mjk1NTdDM0M2NzU3MTFFNUE2RkNCRUUyRDI3OTc0QUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdFNDg0N0M2NzVGMTFFNUE2RkNCRUUyRDI3OTc0QUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyOTU1N0MzQTY3NTcxMUU1QTZGQ0JFRTJEMjc5NzRBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOTU1N0MzQjY3NTcxMUU1QTZGQ0JFRTJEMjc5NzRBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEB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") no-repeat center;
  background-size: 70% 70%;
}
</style>