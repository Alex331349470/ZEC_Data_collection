package com.fr.function;

import com.fr.general.FArray;
import com.fr.general.GeneralUtils;
import com.fr.script.AbstractFunction;

import java.math.BigDecimal;

public class Frequency extends AbstractFunction {

    @Override
    public Object run(Object[] args) {
        return frequency(transArr((FArray)args[0]), transArr((FArray)args[1]));
    }

    private static BigDecimal trans(Object ele){
        try{
            String val = GeneralUtils.objectToString(ele);
            return new BigDecimal(val);
        }catch(Exception e){

        }
        return (BigDecimal) ele;
    }
    /**
     * 将数组转换为大数数组
     * @param in
     * @return
     */
    private static FArray<BigDecimal> transArr(FArray in){
        FArray<BigDecimal> rt = new FArray<BigDecimal>();
        for(int i=0;i<in.length();i++){
            Object ele = in.elementAt(i);
            rt.add(trans(ele));
        }
        return rt;
    }

    public static FArray<Integer> frequency(FArray<BigDecimal> data, FArray<BigDecimal> bins) {
        FArray<Integer> value = new FArray<Integer>();
        int[] result = new int[bins.length()];

        for (int i = 0; i < bins.length(); i++) {
            for (int j = 0; j < data.length(); j++)
                if (i == 0) {
                    if (data.elementAt(j).compareTo(bins.elementAt(i)) <= 0)
                        result[i]++;
                } else {
                    if (data.elementAt(j).compareTo(bins.elementAt(i - 1)) > 0 && data.elementAt(j).compareTo(bins.elementAt(i)) <= 0)
                        result[i]++;
                }

            value.add(result[i]);
        }
        return value;
    }
}