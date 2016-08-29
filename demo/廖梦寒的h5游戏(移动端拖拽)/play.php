<?php
    use app\modules\Savingidol\com\Resource;
    $resource = Resource::instance();
    $picPath = $resource->getPicPath();//图片路径前缀
    $hostInfo = \Yii::$app->request->hostInfo;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>纳凉特辑-解救idol大作战</title>
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta content="telephone=no,email=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1 ,user-scalable=no, maximum-scale=1">
    <link rel="stylesheet" href="<?=M_ASSERTS_DIR?>/css/globle.css?<?=RELEASE_VER?>">
    <link rel="stylesheet" href="<?=M_ASSERTS_DIR?>/css/play.css?<?=RELEASE_VER?>">
    <script>

        function onShareCallback( res ){
            //...
        }

        function defaultCallback( res ){
            //...
        }

        function addPageInfoShare( strJsonData ){
            MfsJSBridge.invokeJsonStringCallback( 'showOptionMenu', '', 'defaultCallback' );

            MfsJSBridge.onJsonStringCallback( 'menu:shareWxMessage', strJsonData, 'onShareCallback' );
            MfsJSBridge.onJsonStringCallback( 'menu:shareWxTimeline', strJsonData, 'onShareCallback' );
            MfsJSBridge.onJsonStringCallback( 'menu:shareQQ', strJsonData, 'onShareCallback' );
            MfsJSBridge.onJsonStringCallback( 'menu:shareWeibo', strJsonData, 'onShareCallback' );
            MfsJSBridge.onJsonStringCallback( 'menu:copyUrl', strJsonData, 'defaultCallback' );

        }

        function shareToWx( strJsonData ){
            MfsJSBridge.invokeJsonStringCallback( 'shareWxMessage', strJsonData, onShareCallback );

        }

        function shareToPyq( strJsonData ){
            MfsJSBridge.invokeJsonStringCallback( 'shareWxTimeline', strJsonData, onShareCallback );

        }

        function shareToQQ( strJsonData ){
            MfsJSBridge.invokeJsonStringCallback( 'shareQQ', strJsonData, onShareCallback );

        }

        function shareToWeibo( strJsonData ){
            MfsJSBridge.invokeJsonStringCallback( 'shareWeibo', strJsonData, onShareCallback );

        }


         window.pageConfig={
            aid:<?=$aid?>,
            sid:<?=$SId?>,
            sessionid:'<?=$sessionId?>',
            pass1 : <?=json_encode($clues['clues'][0]['SId'])?>,
            pass2 : <?=json_encode($clues['clues'][1]['SId'])?>,
            pass3 : <?=json_encode($clues['clues'][2]['SId'])?>,
            sharetitle:'<?=$seasonInfo['ShareTitle']?>',
            sharedesc:'<?=$seasonInfo['ShareDesc']?>',
            shareimg:'<?=$picPath.$seasonInfo['ShareImg']?>',
            shareurl:'<?=$hostInfo.(\yii\helpers\Url::toRoute(['main/entrance']))?>',
         }
       
    </script>
    <script src="<?=M_ASSERTS_DIR?>/js/flexible.debug.js?<?=RELEASE_VER?>"></script>
    <script src="<?=M_ASSERTS_DIR?>/js/flexible_css.debug.js?<?=RELEASE_VER?>"></script>
    <script src="<?=M_ASSERTS_DIR?>/js/zepto.min.js?<?=RELEASE_VER?>"></script>
    <script src='<?=M_ASSERTS_DIR?>/js/index.js?<?=RELEASE_VER?>'></script>
    <script src='<?=M_ASSERTS_DIR?>/js/share.js?<?=RELEASE_VER?>'></script>
</head>
<body>
<div class="wrap">
    <div class="page1">
        <div class="header"><img src="<?=M_ASSERTS_DIR?>/img/save-bg.png"></div>
        <div class="main">
            <div class="bat-left"></div>
            <div class="cage" style="background-image:url('<?=$resource->starPic($SId)?>');background-size:contain; "><img src="<?=M_ASSERTS_DIR?>/img/cage2.png"></div>
            <div class="c-title">你选择了<?=$SName?>，与鬼神对抗往往是很艰难的！你准备好了吗？</div>
            <div class="c-button"><img src="<?=M_ASSERTS_DIR?>/img/begin-save.png"></div>
        </div>
        <div class="bottom">
    <p>本活动最终解释权归魔饭生APP所有</p>
    <p>www.morefans.com.cn</p>
        </div>
    </div>
    <div class="page2">
        <div class="header"><img src="<?=M_ASSERTS_DIR?>/img/save-bg.png"></div>
        <div class="main">
        <div class="bat-left"></div>
            <div class="c2-title">
            <p>查看线索倒计时：00:<span id="count">20</span></p>
            <p id="c2-p">鬼神的线索有三个，点击灯笼，查看线索↓↓</p>
        </div>
        <div>
                <div class="lantern" id="lantern1"><img src="<?=M_ASSERTS_DIR?>/img/clue4.png"></div>
                <div class="lantern" id="lantern2"><img src="<?=M_ASSERTS_DIR?>/img/clue5.png"></div>
                <div class="lantern" id="lantern3"><img src="<?=M_ASSERTS_DIR?>/img/clue6.png"></div>
        </div>
        </div>
        <div class="clear"></div>
        <div class="bottom">
    <p>本活动最终解释权归魔饭生APP所有</p>
    <p>www.morefans.com.cn</p>
        </div>
        <div class="dialog" id="clue1">
            <div class="dia-box"><img src="<?=M_ASSERTS_DIR?>/img/clue0.png"><div class="clue">
            <img src="<?=$clues['clues'][0]['ClPic']?>" class="clue-photo"></div></div>
        </div>
        <div class="dialog" id="clue2">
            <div class="dia-box"><img src="<?=M_ASSERTS_DIR?>/img/clue1.png"><div class="clue"><img src="<?=$clues['clues'][1]['ClPic']?>" class="clue-photo"></div></div>
        </div>
        <div class="dialog" id="clue3">
            <div class="dia-box"><img src="<?=M_ASSERTS_DIR?>/img/clue2.png"><div class="clue"><img src="<?=$clues['clues'][2]['ClPic']?>" class="clue-photo"></div></div>
        </div>
    </div>
    <div class="page3">
        <div class="p3-main">
        <div class="p3-box">
              <?php foreach ($clues['SIds'] as $k => $SIds) :?>
             <div class="p-box" id="box<?=($k+1)?>" data-num="<?=$SIds?>"><img src="<?=$resource->starPic($SIds)?>" class="photo"><img src="<?=M_ASSERTS_DIR?>/img/frame.png" class="p3-bg"><span><?=($k+1)?></span></div>
        <?php endforeach; ?>
             <div class="dotted">
                 <img src="<?=M_ASSERTS_DIR?>/img/dotted.png">
                 <img src="<?=M_ASSERTS_DIR?>/img/dotted.png">
                 <img src="<?=M_ASSERTS_DIR?>/img/dotted.png">
                 <img src="<?=M_ASSERTS_DIR?>/img/dotted.png">
                 <img src="<?=M_ASSERTS_DIR?>/img/dotted.png">
                 <img src="<?=M_ASSERTS_DIR?>/img/dotted.png">
                 <img src="<?=M_ASSERTS_DIR?>/img/dotted.png">
                 <img src="<?=M_ASSERTS_DIR?>/img/dotted.png">
                 <img src="<?=M_ASSERTS_DIR?>/img/dotted.png">
             </div>
             <div class="p3-title">根据线索，将正确密码拖进虚线框内！解除鬼神诅咒！！！</div>
             <div class="fault"><img src="<?=M_ASSERTS_DIR?>/img/false.png"></div>
             <div class="reply">
                <div class="reply-dotted">线索一</div>
                <div class="reply-dotted">线索二</div>
                <div class="reply-dotted">线索三</div>
             </div>
             <div class="prompt">密码错误，您还有<span id="times">2</span>次机会！</div>
        </div>
        </div>
        <div class="bottom">
    <p>本活动最终解释权归魔饭生APP所有</p>
    <p>www.morefans.com.cn</p>
        </div>
    </div>
    <div class="page4">
        <div class="s-main">
    <div class="s-frame"><img src="<?=M_ASSERTS_DIR?>/img/success-frame.png" class="ss-frame"><img src="<?=$resource->starPic($SId)?>" class="s-photo"></div>
    <div class="s-title"><img src="<?=M_ASSERTS_DIR?>/img/save-success.png"></div>
    <div class="s-title2">
        <p>中元节也是团聚的日子，</p>
        <p>不要忘了和家人一起吃饭哦！</p>
    </div>
    <div class="sbtn-left sbtn"><img src="<?=M_ASSERTS_DIR?>/img/share-word.png"></div>
    <div class="sbtn-right sbtn"><img src="<?=M_ASSERTS_DIR?>/img/moretime-word.png"></div>
</div>
<div class="bottom">
    <p>本活动最终解释权归魔饭生APP所有</p>
    <p>www.morefans.com.cn</p>
</div>
    </div>
    <div class="page5">
        <div class="f-main">
   <div class="fail-frame"><img src="<?=$resource->starPic($SId)?>" class="f-photo"><img src="<?=M_ASSERTS_DIR?>/img/fail-frame.png" class="f-frame"></div>
   <div class="save-fail"><img src="<?=M_ASSERTS_DIR?>/img/save-fail.png"></div>
   <div class="fail-word">
    <p>不要再做挣扎了，你的</p>
    <p>爱豆将会永远的困在这里！</p>
     <div class="sbtn-left2 sbtn"><img src="<?=M_ASSERTS_DIR?>/img/share-word.png"></div>
    <div class="sbtn-right2 sbtn"><img src="<?=M_ASSERTS_DIR?>/img/moretime-word.png"></div>
   </div>
</div>
<div class="bottom">
    <p>本活动最终解释权归魔饭生APP所有</p>
    <p>www.morefans.com.cn</p>
</div>
    </div>
    <div class="loading">
    <img src="<?=M_ASSERTS_DIR?>/img/loading.gif">
    </div>
    <div class="share-box">
        <div class="icon">
            <img src="<?=M_ASSERTS_DIR?>/img/wx.png" id="wx">
            <img src="<?=M_ASSERTS_DIR?>/img/pyq.png" id="pyq">
            <img src="<?=M_ASSERTS_DIR?>/img/qq.png" id="qq">
            <img src="<?=M_ASSERTS_DIR?>/img/wb.png" id="wb">           
        </div>
    </div>
</div>
<?php
//统计代码
echo '<img src="'.\app\com\cnzz\CS::cnzzTrackPageView(1258886710).'" width="0" height="0" style="position:fixed;float:left;"/>';
?>

</body>
</html>