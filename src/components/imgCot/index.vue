<style lang="less" scoped>

</style>
<template>
  <!--图片弹出层 开始-->
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog"  aria-hidden="true"><!-- Background of PhotoSwipe.
          It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap"  @click.stop="closeImgPhotoSwipe()">
      <!-- Container that holds slides.
    PhotoSwipe keeps only 3 of them in the DOM to save memory.
    Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden" >

        <div class="pswp__top-bar">

          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button class="pswp__button pswp__button--close" title="Close (Esc)" @click.stop="closeImgPhotoSwipe()"></button>

          <!--<button class="pswp__button pswp__button&#45;&#45;share" title="Share"></button>-->

          <!--<button class="pswp__button pswp__button&#45;&#45;fs" title="Toggle fullscreen"></button>-->

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip">

          </div></div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
  <!--图片弹出层 结束-->
</template>
<script>

    export default{
        name: 'loading',
        methods:{
          closeImgPhotoSwipe(){
              window.closeImgPhotoSwipe();
            }
        },
      mounted() {
        var Photoswipe = require('../../utils/photoswipe.min.js').PhotoSwipe;
        var PhotoSwipeUI_Default = require('../../utils/photoswipe-ui-default.min').PhotoSwipeUI_Default;
        let imgLoading = false;
        window.openImages = function(picUrlArr, Index, e,isOneImgUrl){
          // history.pushState(null, null, location.href);
          window.addEventListener('popstate', back,false);
          function back(){
            window.gallery.close()
            // history.pushState(null, null, location.href );
            window.removeEventListener('popstate', back,false);
          }
          var ev = e || window.event;
          ev.stopPropagation();
          if(imgLoading)return
          imgLoading=true;

          var Count ;
          var imgCot=[] ;
          var ImgLoaded =0;
          var tempArry = [];
          if(isOneImgUrl){
            Count = 1;
            imgCot.push(
              {
                picUrl : picUrlArr
              }
            )
          }else{
            Count =picUrlArr.length;
            //这是判断当前数组没有picUrl属性的处理。
            if(!picUrlArr[0].hasOwnProperty("picUrl")){
              for(var i=0;i< picUrlArr.length;i++){
                tempArry.push({
                  picUrl : picUrlArr[i]
                })
              }
              imgCot = tempArry;
            }else{
              imgCot = picUrlArr;
            }
          }
          var Imgs = new Array(Count);
          var items = [
            //{
            //    src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
            //    w: 964,
            //    h: 1024
            //}
          ];

//预加载图片

//验证是否成功加载完成，如不成功则重新加载
          function validateImages(i){
            if (!Imgs[i].complete)
            {
              window.setTimeout(downloadImage(i),200);
            }
            else if (typeof Imgs[i].naturalWidth != "undefined" && Imgs[i].naturalWidth == 0)
            {
              window.setTimeout(downloadImage(i),200);
            }
            else
            {
              ImgLoaded++;
              if(ImgLoaded == Count)
              {
                for(var i = 0; i<Imgs.length; i++){
                  items.push(
                    {   src:Imgs[i].src,
                      w:Imgs[i].naturalWidth,
                      h:Imgs[i].naturalHeight
                    }
                  )
                }
                openPhotoSwipe();
              }
            }

            // 如果最后一张加载完成
            if(i===Imgs.length){
              imgLoading=false;
            }
          }

          //加载单个图片
          function downloadImage(i)
          {
            try{
              var img = new Image();
              img.src =imgCot[i].picUrl;
              img.onload = validateImages.bind(this,i);
              Imgs[i] = img;
            }catch(e){}
          }
          function preLoadImgs()
          {
            for(var i=0;i<Imgs.length;i++){

              downloadImage(i);
            }
          }
          preLoadImgs();
          var openPhotoSwipe = function() {
            var pswpElement = document.querySelectorAll('.pswp')[0];
            // build items array
            // define options (if needed)
            var options = {
              // history & focus options are disabled on CodePen
              index:Index,
              history: false,
              focus: false,
              showAnimationDuration: 0,
              hideAnimationDuration: 0
            };
            window.gallery = new Photoswipe( pswpElement, PhotoSwipeUI_Default, items, options);
            window.gallery.init();
          };
        };

        window.closeImgPhotoSwipe = function(){
          window.gallery.close();
        };


//全局方法 图片位置调整
        window.imgOnload = function(img){
          img.parentNode.className ='';
          img.className ='';
          /*
           * img  ,图片
           * 75px 宽高
           * */
          if(img.naturalHeight > img.naturalWidth){
            img.className ='isH';
            let d = (img.naturalHeight - img.naturalWidth) /(img.naturalWidth /75);
            // let d= img.height - img.width;
            img.style.marginTop  = -d/2 +'px';
          }
          else if(img.naturalHeight !== img.naturalWidth ){
            img.className  ='isW';
            let d = (img.naturalWidth - img.naturalHeight) /(img.naturalHeight /75);
            // let d= img.width - img.height;
            img.style.marginLeft  =-d/2 +'px';
          }else{
            img.style.width= '100%';
          }
        };
      }
    }

</script>
