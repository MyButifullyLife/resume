<style lang="less" scoped>

    .closeCot{
        position: absolute;
        top: 14px;
        right: 10px;
        height: 45px;
        width: 60px;
        text-align: center;
        >div{
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 28px;
            height: 20px;
            text-align: center;
            font-size: 12px;
            color: #fff;
        }

        >canvas{
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
</style>


<template>
<div  style="width: 100%;height: 100%;position: fixed; top: 0;  z-index: 0; background-color:#25455d; ">
        <canvas id="canvas" width="400" height="800"></canvas>
       <!--<img src="../../assets/images/startText.png"   style="position: absolute; top: 13%; left: 0; width: 100%; " alt="">-->

     <!--退出按钮-->
      <div class="closeCot"  @click.stop="closeCot">
          <!--<canvas id="closeCanvas" width="45" height="45" ></canvas>-->
          <!--<div>-->
              <!--跳过-->
          <!--</div>-->
      </div>
</div>
</template>

<script>


export default {
    name:'',
    props:{
    },
    data() {
        return {
           img:require('../../assets/images/引导页1.jpg')
        }
    },
    computed: {
    },
    mounted() {
        let _this  =this;

        //宇宙特效

        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            ctx1 = canvas.getContext('2d'),
            w = canvas.width = window.innerWidth,
            h = canvas.height = window.innerHeight,

            hue = 217,
            stars = [],
            count = 0,
            maxStars = 50;//星星数量




        var canvas2 = document.createElement('canvas'),
            ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        var half = canvas2.width / 2,
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#CCC');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.35, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        // End cache

        function random(min, max) {
            if (arguments.length < 2) {
                max = min;
                min = 0;
            }

            if (min > max) {
                var hold = max;
                max = min;
                min = hold;
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x, y) {
            var max = Math.max(x, y),
                diameter = Math.round(Math.sqrt(max * max + max * max));
            return diameter / 2;
            //星星移动范围，值越大范围越小，
        }

        var Star = function() {

            this.orbitRadius = random(maxOrbit(w, h));
            this.radius = random(60, this.orbitRadius) / 10;
            //星星大小
            this.orbitX = w / 2;
            this.orbitY = h / 2;
            this.timePassed = random(0, maxStars);
            this.speed = random(this.orbitRadius) / 50000;
            //星星移动速度
            this.alpha = random(2, 10) / 10;

            count++;
            stars[count] = this;
        }

        Star.prototype.draw = function() {
            var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                twinkle = random(10);

            if (twinkle === 1 && this.alpha > 0) {
                this.alpha -= 0.05;
            } else if (twinkle === 2 && this.alpha < 1) {
                this.alpha += 0.05;
            }

            ctx.globalAlpha = 1;
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
            this.timePassed += this.speed;
        }

        for (var i = 0; i < maxStars; i++) {
            new Star();
        }

        function animation() {

            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.2; //尾巴
            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';

            ctx.fillRect(0, 0, w, h)
            ctx.globalCompositeOperation = 'lighter';

//            调色调成首页样式

            for (var i = 1, l = stars.length; i < l; i++) {
                stars[i].draw();
            };

//
//            ctx.fillStyle = 'rgba(30,20,10,.3)';
//            ctx.fillRect(0, 0, w, h)
//            调色调成首页结束

            window.requestAnimationFrame(animation);
        }


        animation();

        setTimeout(function () {
            _this.closeCot();
        },5000)
    },
    methods: {
        closeCot(){

        }

    }
}
</script>

<style lang="less" scoped>
    .tableFixed{
        word-wrap: break-word;
        word-break: break-all;
        table-layout: fixed;
        white-space:nowrap;
    }
    table >thead,td:first-child{
        color :#ffffff;
    }
    .tdTwo{
        width: 70px;
        padding: 0 5px;
        white-space: initial;
   }
    td:nth-child(2) div{
        width: 100%;
        line-height: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .isLong{
        white-space: inherit!important;
    }
</style>
