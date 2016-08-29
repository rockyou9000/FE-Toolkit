function myAddEvent(obj,event,fn)    //obj为要绑定事件的元素，event为要绑定的事件，fn为绑定事件的函数
            {
                if(obj.attachEvent)
                {
                    obj.attachEvent("on" + event,fn);
                }
                else
                {
                    obj.addEventListener(event,fn,false);
                }
            }



 myAddEvent(oBtn,"click",function()
            {
                alert("a");
            })