<template>
  <div class="pages">
    <div class="pages-main">
      <BasicTitle :title="'上币说明'" :basicStyle="titleStyle">
        <template #message>
          <div class="textStyle">
            除了上述举例的图片，NFT还具有其他多种信息，最重要的就是NFT的编码，也就是Token
            ID，这个编码是唯一的。<br />
            由于以上三点，NFT成了不可分割、可确权、可追溯的某种信息及价值的载体。载体可以有多种格式或者标准。仍与图片类比，同样一张图可以有PDF格式、PNG格式的，也可以有JPEG格式的。NFT同理。<br />
            知道了NFT是什么以后，下面聊聊NFT有哪些种类，具体有什么用。2021年，越来越多的歌手开始尝试制作、发行自己的音乐NFT，这让音乐NFT逐渐在圈外产生了更多的影响力。<br />
            入选过世界百大DJ的音乐人Justin Blau（又名3LAU）在2021年2月底与Origin
            Protocol合作推出NFT专辑Ultraviolet，通过拍卖筹集了1170万美元。<br />
            下图为3LAU转发自己发行NFT的新闻。Origin
            Protocol称这次拍卖具有重大的意义，因为这是世界上第一张NFT音乐专辑。<br />
            与此同时，国内也有一些音乐人积极地参与进来。2021年7月，参加过第一季“中国好声音”的爵士歌手赵可，把单曲Lost
            in translation做成了NFT在全球发行。
          </div>
        </template>
      </BasicTitle>

      <BasicTitle :title="'提交上币申请'" :basicStyle="formStyle">
        <template #message>
          <div class="formBox">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="联系人：" required>
                <el-input v-model="form.user" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="联系方式：" required>
                <el-input
                  v-model="form.contact"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <!--代币LOGO上传-->
              <el-form-item label="代币LOGO：" required>
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :limit="1"
                  :file-list="fileList"
                  :on-change="fileChange"
                  :http-request="upload"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-form-item>

              <!--表单-->
              <el-form-item label="代币合约地址" required>
                <el-input
                  v-model="form.contract_address"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item label="代币全称：" required>
                <el-input
                  v-model="form.full_name"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>

              <el-form-item label="代币简称：" required>
                <el-input
                  v-model="form.alias_name"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item label="发行总量：" required>
                <el-input
                  v-model="form.total_supply"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>

              <el-form-item label="流通总量：" required>
                <el-input
                  v-model="form.currency"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>

              <el-form-item label="代币描述：" required>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 6 }"
                  placeholder="请输入介绍信息"
                  v-model="form.desc"
                  maxlength="300"
                  show-word-limit
                >
                </el-input>
              </el-form-item>

              <el-form-item label="官网：">
                <el-input
                  v-model="form.official"
                  placeholder="请输入项目官网链接"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </BasicTitle>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      titleStyle: {
        position: "relative",
        top: "24px",
      },
      formStyle: {
        position: "relative",
        top: "32px",
      },
      form: {
        user: "boxi666", //联系人
        contact: "1234567", //电话
        contract_address: "boxitoken111", //地址
        full_name: "boxi666", //代币全称
        alias_name: "boxi", //代币简称
        total_supply: "8888888", //发行总量
        currency: "8888888", //流通总量
        desc: "text", //描述
        official: "http://boxi666.com", //官网
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
      tokenLogo: "",
    };
  },
  methods: {
    async onSubmit() {
      // console.log("submit!");
      const {
        user,
        contact,
        contract_address,
        full_name,
        alias_name,
        total_supply,
        currency,
        desc,
        official,
      } = this.form;
      const params = {
        apply_type: "token",
        user,
        contact,
        Logo: this.tokenLogo,
        contract_address,
        full_name,
        alias_name,
        total_supply,
        currency,
        desc,
        official,
      };
      const res = await axios.post(" http://localhost:8081/api/apply/apply",{...params});
      console.log('提交结果',res);
    },
    upload() {},
    fileChange(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        const base64 = reader.result.split(",")[1];
        // console.log("src", src);
        this.tokenLogo = src;
      };
      reader.readAsDataURL(file.raw);
    },
    handleRemove(file, fileList) {
      // console.log(file)
      console.log(file);
      console.log(fileList);
    },
  },
};
</script>

<style lang="scss" scoped>
.pages {
  background: #f8fafb;
}
.pages-main {
  width: 1280px;
  margin: 0 auto;
}
.textStyle {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px;
  color: rgba(20, 37, 62, 0.85);
  line-height: 24px;
}

::v-deep .formBox {
  position: relative;
  top: 32px;
  width: 460px;
  margin: 0 auto;
  padding-bottom: 80px;
  .el-input__inner {
    height: 28px;
    background: #ffffff;
    border-radius: 2px;
    font-weight: 400;
    font-size: 12px;
  }

  .el-form-item__label {
    font-weight: 400;
    font-size: 12px;
    color: rgba(20, 37, 62, 0.85);
  }

  .el-textarea {
    .el-textarea__inner {
      border-radius: 2px;
      font-weight: 400;
      font-size: 12px;
      font-family: PingFangSC-Regular;
    }
    .el-input__count {
      height: 20px;
      line-height: 20px;
      bottom: -20px;
    }
  }

  .el-button--primary {
    width: 57px;
    height: 32px;
    background: #1e42ed;
    border-radius: 2px;

    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
  }

  .el-button--default {
    width: 57px;
    height: 32px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    border-radius: 2px;

    font-weight: 400;
    font-size: 14px;
    color: rgba(20, 37, 62, 0.85);
    text-align: center;
    line-height: 22px;
  }
  .el-button {
    padding: 0;
  }
}

::v-deep .el-upload--picture-card {
  background: #f6f6f6;
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  line-height: 80px;
}
::v-deep .el-upload-list__item {
  width: 80px !important;
  height: 80px !important;
  border-radius: 2px !important;
}
</style>
