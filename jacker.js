/**		
 * M站事件追踪		
 * 		
 * Usage: 在</body>之前添加如下代码		
 * <script type="text/javascript" src="/static/wap/js/mtracker.js"></script>		
 * <img class="tracker_img" style="border:0;width:0;height:0;" />		
 * 然后在标签中添加触发方法,like:<a onclick="mt.send('首页', '首页_底部浮动下载图片');" href='...' >点我</a>		
 * 		
 * Note:该脚本使用jquery，所以必须添加jquery的引用		
 */		
if (typeof mTracker !== 'object') {		
    mTracker = (function () {		
        var page_title = document.title,		
        page_url = document.location.href,		
        user_identify = '',		
        element_title = '';		
        var tracker_url = 'http://tracker.sz-dev.ymt360.com/tracker.php';		
		
        /**提供被调用发起事件的方法，like:mt.send('首页', '首页_底部浮动下载图片');		
         * @param  {string} s source参数，该页的标志，like:首页		
         * @param  {[type]} t 被点击的元素的标志,like:首页_底部浮动下载图片		
         * @return {[type]}   无返回		
         */		
        this.send = function(s,t) {		
            var source = s || page_title;		
            var url = encodeURIComponent(page_url);		
            var title = t || page_title +'_element';		
            var uid = get_uid('uid');		
            var data = page_title="+source+"&page_url="+url+"&element_title="+title+"&user_identify="+uid;
            var url = tracker_url +'?' +data;		
            request(url);		
        }		
		
        /**		
         * 发送请求，通过改变一个img元素的src属性		
         * @param  {string} url 一个已经包装好的url,like:http://tracker.sz-dev.ymt360.com/trackr.hp?source=首页&title=sss&page_url=http://m.ymt.com/index.php		
         * @return {[type]}     没有返回		
         */		
        function request(url){		
            $('.tracker_img').attr('src', url);		
        }		
        		
        /**		
         * 获取用户的唯一标志		
         * @return {[type]} 返回当前时间戳加上一个随机数，该用户标志在后端会加上IP，like:123.32.60.21_124123443412_65		
         */		
        function get_uid(){		
            var timespan = new Date().getTime();		
            var rand_num = Math.ceil(Math.random() *100000000000);		
		
            if(!getCookie('uid')){		
                setCookie('uid', timespan +'_' +rand_num);		
            }		
            return getCookie('uid');		
        }		
		
        /**		
         * Set cookie value		
         * @param {[type]} c_name     [description]		
         * @param {[type]} value      [description]		
         * @param {[type]} expiredays [description]		
         */		
        function setCookie(c_name,value,expiredays)		
        {		
            var exdate=new Date()		
            exdate.setDate(exdate.getDate()+expiredays)		
            document.cookie=c_name+ "=" +escape(value)+		
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())		
        }		
		
        /**		
         * Get cookie value		
         * @param  {string} c_name cookie 's name		
         * @return {string}        value of the cookie		
         */		
        function getCookie(c_name)		
        {		
            if (document.cookie.length>0)		
            {		
                var c_end ='', c_start=document.cookie.indexOf(c_name + "=");		
                if (c_start!=-1)		
                { 		
                    c_start=c_start + c_name.length+1 		
                    c_end=document.cookie.indexOf(";",c_start)		
                    if (c_end==-1) 		
                        c_end=document.cookie.length		
                    return unescape(document.cookie.substring(c_start,c_end))		
                } 		
            }		
            return ""		
        }		
    });		
}		
		
$(function(){		
    var mt = new mTracker();		
    $("a").bind("click",function(){		
        mt.send(document.title, $(this).html());		
    });		
});