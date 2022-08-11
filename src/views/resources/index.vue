<template>
  <div class="develop">
    <div class="developMain">
      <div class="developMain-title">API文档</div>
      <div class="developMain-box">
        <div class="basic">
          <p>
            除了上述举例的图片，NFT还具有其他多种信息，最重要的就是NFT的编码，也就是TokenID，这个编码是唯一的。<br />
            由于以上三点，NFT成了不可分割、可确权、可追溯的某种信息及价值的载体。载体可以有多种格式或者标准。仍与图片类比，同样一张图可以有PDF格式、PNG格式的，也可以有JPEG格式的。NFT同理。<br />
            知道了NFT是什么以后，下面聊聊NFT有哪些种类，具体有什么用。2021年，越来越多的歌手开始尝试制作、发行自己的音乐NFT，这让音乐NFT逐渐在圈外产生了更多的影响力。<br />
            入选过世界百大DJ的音乐人Justin Blau（又名3LAU）在2021年2月底与Origin
            Protocol合作推出NFT专辑Ultraviolet，通过拍卖筹集了1170万美元。<br />
            下图为3LAU转发自己发行NFT的新闻。OriginProtocol称这次拍卖具有重大的意义，因为这是世界上第一张NFT音乐专辑。<br />
            与此同时，国内也有一些音乐人积极地参与进来。2021年7月，参加过第一季“中国好声音”的爵士歌手赵可，把单曲Lost
            intranslation做成了NFT在全球发行。2021年8月，胡彦斌把自己在2001年未公开的Demo版本的歌曲《和尚》做成了NFT，在QQ音乐上发售2001个，随即售完。
          </p>
        </div>

        <basicTitle :title="'接口名称'">
          <template #message>
            <div class="developApi">
              <p>
                接口:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;0xdec4408f438b7beadeb04eaca031cad5131f7e8f4cdc45d0ebf1d29c019be3d9
              </p>
              <p>
                接口解释:&emsp;&emsp;&emsp;&emsp;&emsp;除了上述举例的图片，NFT还具有其他多种信息，最重要的就是NFT的编码，也就是Token
                ID
              </p>
            </div>
          </template>
        </basicTitle>

        <basicTitle :title="'接口名称'">
          <template #message>
            <div class="developApi">
              <p>
                接口:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;0xdec4408f438b7beadeb04eaca031cad5131f7e8f4cdc45d0ebf1d29c019be3d9
              </p>
              <p>
                接口解释:&emsp;&emsp;&emsp;&emsp;&emsp;除了上述举例的图片，NFT还具有其他多种信息，最重要的就是NFT的编码，也就是Token
                ID
              </p>
            </div>
          </template>
        </basicTitle>

        <basicTitle :title="'接口名称'">
          <template #message>
            <div class="developApi">
              <p>
                接口:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;0xdec4408f438b7beadeb04eaca031cad5131f7e8f4cdc45d0ebf1d29c019be3d9
              </p>
              <p>
                接口解释:&emsp;&emsp;&emsp;&emsp;&emsp;除了上述举例的图片，NFT还具有其他多种信息，最重要的就是NFT的编码，也就是Token
                ID。最重要的就是NFT的编码，也就是Token最重要的就是NFT的编码，也就是Token
              </p>
            </div>
          </template>
        </basicTitle>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.developMain {
  margin: 0 auto;
  width: 1280px;
  &-title {
    padding: 16px 0;
    height: 28px;
    font-weight: 500;
    font-size: 20px;
    color: rgba(20, 37, 62, 0.85);
  }
  &-box {
    & > div {
      margin-bottom: 16px;
    }
    .basic {
      width: 1232px;
      height: 168px;
      font-weight: 400;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.85);
      line-height: 24px;
      padding: 24px;
      background: #ffffff;
      border: 1px solid #e9eaef;
      box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
      border-radius: 4px;
    }
  }
}

.developApi {
  height: 72px;
  font-weight: 400;
  font-size: 12px;
  color: rgba(20, 37, 62, 0.85);
  line-height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    height: 28px;
    line-height: 28px;
  }
}

@media screen and (max-width:598px) {
  .developMain{
    width: 100%;
    &-title{
      padding-left: 16px;
    }
    .basic{
      width: 100%;
      height: auto;
      padding: 0;
    }
  }

  .developApi{
    height: 80px;
    justify-content: space-evenly;
  }
}
</style>
