<template>
  <div class="pages">
    <div class="pages-main">
      <BasicTitle :title="languagePack.applytext01" :basicStyle="titleStyle">
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

      <BasicTitle :title="languagePack.applytext02" :basicStyle="formStyle">
        <template #message>
          <div class="formBox">
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-width="190px"
            >
              <el-form-item
                :label="languagePack.applytext05 + '： '"
                prop="user"
              >
                <el-input
                  v-model="form.user"
                  :placeholder="languagePack.applytext06"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="languagePack.applytext07 + '：'"
                prop="contact"
              >
                <el-input
                  v-model="form.contact"
                  :placeholder="languagePack.applytext08"
                ></el-input>
              </el-form-item>
              <!--代币LOGO上传-->
              <el-form-item :label="languagePack.applytext09 + '：'">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :limit="1"
                  :file-list="fileList"
                  :on-change="fileChange"
                  :http-request="upload"
                  accept=".png"
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
                  <div
                    slot="tip"
                    style="white-space: nowrap"
                    class="el-upload__tip"
                  >
                    {{ languagePack.applytext34 }}
                  </div>
                </el-upload>
              </el-form-item>

              <!--表单-->
              <el-form-item
                :label="languagePack.applytext11 + '：'"
                prop="contract_address"
              >
                <el-input
                  v-model="form.contract_address"
                  :placeholder="languagePack.applytext11"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="languagePack.applytext12 + '：'"
                prop="full_name"
              >
                <el-input
                  v-model="form.full_name"
                  :placeholder="languagePack.applytext13"
                ></el-input>
              </el-form-item>

              <el-form-item
                :label="languagePack.applytext14 + '：'"
                prop="alias_name"
              >
                <el-input
                  v-model="form.alias_name"
                  :placeholder="languagePack.applytext15"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="languagePack.applytext16 + '：'"
                prop="total_supply"
              >
                <el-input
                  v-model="form.total_supply"
                  :placeholder="languagePack.applytext17"
                ></el-input>
              </el-form-item>

              <el-form-item
                :label="languagePack.applytext18 + '：'"
                prop="currency"
              >
                <el-input
                  v-model="form.currency"
                  :placeholder="languagePack.applytext19"
                ></el-input>
              </el-form-item>

              <el-form-item
                :label="languagePack.applytext20 + '：'"
                prop="desc"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 6 }"
                  :placeholder="languagePack.applytext21"
                  v-model="form.desc"
                  maxlength="150"
                  show-word-limit
                >
                </el-input>
              </el-form-item>

              <el-form-item
                :label="languagePack.applytext23 + '：'"
                class="unRequired"
              >
                <el-input
                  v-model="form.official"
                  :placeholder="languagePack.applytext24"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">{{
                  languagePack.applytext25
                }}</el-button>
                <el-button @click="clearForm('form')">{{
                  languagePack.applytext26
                }}</el-button>
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
import mixins from "@/mixins";
import { sumbitToken } from "@/api/api.js";
export default {
  mixins: [mixins],
  data() {
    let username = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.languagePack.applytext28));
      }
      if (value.length > 20) {
        return callback(new Error(this.languagePack.applytext29));
      } else {
        callback();
      }
    };
    let usercontact = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.languagePack.applytext30));
      }
      if (
        !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
          value
        )
      ) {
        return callback(new Error(this.languagePack.applytext31));
      } else {
        callback();
      }
    };

    let issuetotal = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.languagePack.applytext27));
      }
      if (!Number.isInteger(value * 1)) {
        return callback(new Error(this.languagePack.applytext32));
      } else {
        callback();
      }
    };

    let descmessage = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.languagePack.applytext27));
      }
      if (value.length > 300) {
        return callback(new Error("长度不超过150"));
      } else {
        callback();
      }
    };

    let contract_address = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.languagePack.applytext27));
      } else {
        callback();
      }
    };

    let full_name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.languagePack.applytext27));
      }
      if (value.length > 20) {
        return callback(new Error("不超过20字"));
      } else {
        callback();
      }
    };

    let alias_name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.languagePack.applytext27));
      }
      if (value.length > 10) {
        return callback(new Error("不超过10个字"));
      } else {
        callback();
      }
    };
    let logo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请上传图片"));
      }
    };
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
        user: "", //联系人boxi666
        contact: "", //电话 1234567
        contract_address: "", //地址 boxitoken111
        full_name: "", //代币全称 boxi666
        alias_name: "", //代币简称 boxi
        total_supply: "", //发行总量 8888888
        currency: "", //流通总量 8888888
        desc: "", //描述 text
        official: "", //官网 http://boxi666.com
      },
      dialogVisible: false,
      disabled: false,
      fileList: [],
      tokenLogo: "",
      rules: {
        user: [{ validator: username, trigger: "blur" }],
        contact: [{ validator: usercontact, trigger: "blur" }],
        total_supply: [{ validator: issuetotal, trigger: "blur" }],
        currency: [{ validator: issuetotal, trigger: "blur" }],
        desc: [{ validator: descmessage, trigger: "blur" }],
        contract_address: [{ validator: contract_address, trigger: "blur" }],
        full_name: [{ validator: full_name, trigger: "blur" }],
        alias_name: [{ validator: alias_name, trigger: "blur" }],
        logo: [{ validator: logo, trigger: "change" }],
      },
    };
  },
  methods: {
    async onSubmit(formName) {
      // console.log("submit!");
      let status;

      this.$refs[formName].validate((e) => {
        if (!e) {
          return (status = false);
        } else {
          return (status = true);
        }
      });
      if (!status) return;
      if (!this.tokenLogo)
        return this.messageBox(this.languagePack.applytext33, "error");
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
        order: 1,
      };
      const { code, msg } = await sumbitToken(params);
      if (code === 7) {
        this.messageBox(this.languagePack.prompttext13, "error");
      } else {
        this.messageBox(this.languagePack.prompttext14, "success");
      }
    },
    upload() {},
    fileChange(file) {
      this.fileList.push(file);
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
      console.log(file);
      for(let i in this.fileList){
        if(this.fileList[i].url === file.url){
          this.fileList.splice(i,1)
        }
      }
    },
    clearForm(formName) {
      this.$refs[formName].resetFields();
      this.form.official = "";
      this.fileList = []
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
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
  margin: 0 auto 96px;
}
.textStyle {
  font-size: 12px;
  color: rgba(20, 37, 62, 0.85);
  line-height: 24px;
}

::v-deep .formBox {
  position: relative;
  top: 32px;
  width: 460px;
  margin: 0 auto 80px;
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

@media screen and (max-width: 598px) {
  .pages-main {
    width: 100%;
    .formBox {
      width: 100%;
    }
  }
}

::v-deep .el-form-item__label {
  &::before {
    content: "*";
    color: #ed422b;
    margin-right: 2px;
    vertical-align: middle;
  }
}
::v-deep .unRequired {
  .el-form-item__label {
    &::before {
      content: "" !important;
    }
  }
}
</style>
