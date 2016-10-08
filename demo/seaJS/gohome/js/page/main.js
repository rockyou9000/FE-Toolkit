/* 
 *  轻App程序入口
 * ----------------------------------
 ************************************************************/

define(function(require, exports, module){
	
	//引用功能库模块
	var $ = require('lib/zepto/zepto');					//zepto模块

	//引用app全局模块
	var globalAudio = require('units/globalAudio');		//全局音频模块
	
	require('modules/index/main').init();
	
});