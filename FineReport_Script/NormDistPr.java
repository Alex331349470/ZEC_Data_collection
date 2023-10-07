package com.fr.function;

import com.fr.general.GeneralUtils;
import com.fr.script.AbstractFunction;

import java.math.BigDecimal;

public class NormDistPr extends AbstractFunction {
    public Object run (Object[] args) {
        return pdf(trans(args[0]), trans(args[1]), trans(args[2]));
    }
    private static final double SQRT_2PI = Math.sqrt(2 * Math.PI);
    private static BigDecimal trans(Object ele){
        try{
            String val = GeneralUtils.objectToString(ele);
            return new BigDecimal(val);
        }catch(Exception e){

        }
        return (BigDecimal) ele;
    }
    public static double pdf(BigDecimal x, BigDecimal mean, BigDecimal stdDev) {
        double z = (x.doubleValue()-mean.doubleValue()) / stdDev.doubleValue();
        return Math.exp(-z * z / 2.0) / (SQRT_2PI * stdDev.doubleValue());
    }
}