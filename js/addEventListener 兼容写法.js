function myAddEvent(obj,event,fn)    //objΪҪ���¼���Ԫ�أ�eventΪҪ�󶨵��¼���fnΪ���¼��ĺ���
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