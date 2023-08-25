package com.fr.function;
import com.fr.general.FArray;
import com.fr.general.GeneralUtils;
import com.fr.script.AbstractFunction;

import java.math.BigDecimal;

public class JugeMR extends AbstractFunction {

    @Override
    public Object run(Object[] args) {
        return juge_mr(transArr2((FArray) args[0]), trans(args[1]), trans2(args[2]));

    }

    private static BigDecimal trans(Object ele){
        try{
            String val = GeneralUtils.objectToString(ele);
            return new BigDecimal(val);
        }catch(Exception e){

        }
        return (BigDecimal) ele;
    }

    private static Double trans2(Object ele){
        try{
            String val = GeneralUtils.objectToString(ele);
            return Double.parseDouble(val);
        }catch(Exception e){

        }
        return (Double) ele;
    }

    private static FArray<BigDecimal> transArr(FArray in){
        FArray<BigDecimal> rt = new FArray<BigDecimal>();
        for(int i=0;i<in.length();i++){
            Object ele = in.elementAt(i);
            rt.add(trans(ele));
        }
        return rt;
    }

    private  static FArray<Double> transArr2(FArray in){
        FArray<Double> rt = new FArray<Double>();
        for(int i=0;i<in.length();i++){
            Object ele = in.elementAt(i);
            rt.add(trans2(ele));
        }
        return rt;
    }
    //判异11
    public static String[] limitControl(FArray<Double> arr, BigDecimal UCLr, Double LCLr) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        for (int i = 0; i < arr.length(); i++) {
            if (arr.elementAt(i) > UCLr.doubleValue() || arr.elementAt(i) < LCLr)
                result[i] = "判异规则1：超出控制限";
            else
                result[i] = "";
        }

        return result;
    }

    public static FArray<String> juge_mr (FArray<Double> arr,  BigDecimal UCLr, Double LCLr) {
        FArray<String> value = new FArray<String>();

        String[] result = new String[arr.length()];
        String[] result1 = limitControl(arr, UCLr, LCLr);

        for (int i = 0; i < arr.length(); i++) {
            result[i] = result1[i];
            value.add(result[i]);
        }

        return value;
    }

}
