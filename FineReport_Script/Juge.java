package com.fr.function;

import com.fr.general.FArray;
import com.fr.general.GeneralUtils;
import com.fr.script.AbstractFunction;

import java.math.BigDecimal;

public class Juge extends AbstractFunction {

    @Override
    public Object run(Object[] args) {
        return juge((FArray<Double>) args[0], trans(args[1]), trans(args[2]), trans2(args[3]), (Integer) args[4], (Integer) args[5], (Integer) args[6],
                (Integer) args[7], (Integer) args[8], (Integer) args[9], (Integer) args[10], (Integer) args[11], trans2(args[12]),
                (Integer) args[13], (Integer) args[14], trans2(args[15]), (Double) args[16], (Double) args[17]);

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

    public static String[] findLeavingCenterLineBeyondstdev(FArray<Double> arr, BigDecimal center, BigDecimal stdev, Double step) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        //
        for (int i = 0; i < arr.length(); i++)
            if (Math.abs(arr.elementAt(i) - center.doubleValue()) > step * stdev.doubleValue())
                result[i] = "判异规则1：1个点距离中心线大于" + Double.toString(step) + "倍标准差";
            else
                result[i] = "";

        return result;
    }

    //判异2
    public static String[] sameSideLine(FArray<Double> arr, Integer limit, BigDecimal center) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        int countAbove = 0; //记录在中心线上方的连续点的个数
        int countBelow = 0; //记录在中心线下方的连续点的个数
        for (int i = 0; i < arr.length(); i++) {
            if (arr.elementAt(i) > center.doubleValue()) {
                countAbove++;
                countBelow = 0;
            } else {
                countBelow++;
                countAbove = 0;
            }
            if (countAbove == limit || countBelow == limit)
                for (int j = i - limit + 1; j <= i; j++)
                    result[j] = "判异规则2：连续" + Integer.toString(limit) + "个点在中心线同一侧";
            else
                result[i] = "";
        }

        return result;
    }

    //判异3
    public static String[] increaseOrDecrease(FArray<Double> arr, Integer limit) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        int countIncrease = 0;
        int countDecrease = 0;
        for (int i = 0; i < arr.length(); i++) {
            if ((i+1) < arr.length()) {
                if (arr.elementAt(i) < arr.elementAt(i+1)) {
                    countIncrease++;
                    countDecrease = 0;
                } else if (arr.elementAt(i) > arr.elementAt(i+1)) {
                    countDecrease++;
                    countIncrease = 0;
                }
                if (countIncrease == limit || countDecrease == limit)
                    for (int j = i - limit + 1; j <= i; j++)
                        result[j] = "判异规则3：连续" + Integer.toString(limit) + "个点递增或递减";
                else
                    result[i] = "";
            } else
                result[i] = "";
        }

        return result;
    }

    //判异4
    public static String[] upAndDown(FArray<Double> arr, Integer limit) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        int count = 0;
        for (int i = 0; i < arr.length(); i++) {
            if ((i+2) < arr.length()) {
                if((arr.elementAt(i) > arr.elementAt(i+1) && arr.elementAt(i+1) < arr.elementAt(i+2))
                        || (arr.elementAt(i) < arr.elementAt(i+1) && arr.elementAt(i+1) > arr.elementAt(i+2)))
                    count++;
                if (count == limit)
                    for (int j = i - limit + 1; j <= i; j++)
                        result[j] = "判异规则4：连续" + Integer.toString(limit) + "个点上下交错";
                else
                    result[i] = "";
            } else
                result[i] = "";
        }

        return result;
    }

    //判异5
    public static String[] findLeavingCenterLineBeyondstdevSameSide(FArray<Double> arr, Integer limit, BigDecimal center, BigDecimal stdev) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        int countAbove = 0;
        int countBelow = 0;
        for (int i = 0; i < arr.length(); i++) {
            if (arr.elementAt(i) > center.doubleValue()) {
                if (arr.elementAt(i) - center.doubleValue() > 2 * stdev.doubleValue())
                    countAbove++;

                countBelow = 0;
            } else if (arr.elementAt(i) < center.doubleValue()){
                if (center.doubleValue() - arr.elementAt(i) > 2 * stdev.doubleValue())
                    countBelow++;

                countAbove = 0;
            }

            if (countAbove == limit || countBelow == limit)
                for (int j = i - limit + 1; j <= i; j++)
                    result[j] = "判异规则5：连续" + Integer.toString(limit) + "个点中有" + Integer.toString(limit - 1) + "个点距离中心线(同侧）大于2倍标准差";
            else
                result[i] = "";
        }

        return result;
    }

    //判异6
    public static String[] findLeavingCenterLineBeyondstdevSameSide2(FArray<Double> arr, Integer limit, BigDecimal center, BigDecimal stdev) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        int countAbove = 0;
        int countBelow = 0;
        for (int i = 0; i < arr.length(); i++) {
            if (arr.elementAt(i) > center.doubleValue()) {
                if (arr.elementAt(i) - center.doubleValue() > stdev.doubleValue())
                    countAbove++;

                countBelow = 0;
            } else if (arr.elementAt(i) < center.doubleValue()){
                if (center.doubleValue() - arr.elementAt(i) > stdev.doubleValue())
                    countBelow++;

                countAbove = 0;
            }

            if (countAbove == limit || countBelow == limit)
                for (int j = i - limit + 1; j <= i; j++)
                    result[j] = "判异规则5：连续" + Integer.toString(limit) + "个点中有" + Integer.toString(limit - 1) + "个点距离中心线(同侧）大于1倍标准差";
            else
                result[i] = "";
        }

        return result;
    }

    //判异7
    public static String[] findLeavingCenterLineWithinstdev(FArray<Double> arr, Integer limit, BigDecimal center, BigDecimal stdev) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        int count = 0;
        for (int i = 0; i < arr.length(); i++) {
            if (Math.abs(center.doubleValue() - arr.elementAt(i)) < stdev.doubleValue())
                count++;
            if (count == limit)
                for (int j = i - limit + 1; j <= i; j++)
                    result[j] = "判异规则7：连续" + Integer.toString(limit) + "个点距离中心线(任一侧)1个标准差内";
            else
                result[i] = "";
        }

        return result;
    }

    //判异8
    public static String[] findLeavingCenterLineBeyondstdevWithin(FArray<Double> arr, Integer limit, BigDecimal center, BigDecimal stdev) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        int count = 0;
        for (int i = 0; i < arr.length(); i++) {
            if (Math.abs(center.doubleValue() - arr.elementAt(i)) > stdev.doubleValue())
                count++;
            if (count == limit)
                for (int j = i - limit + 1; j <= i; j++)
                    result[j] = "判异规则8：连续" + Double.toString(limit) + "个点距离中心线(任一侧）大于一个标准差";
            else
                result[i] = "";
        }

        return result;
    }

    //判异9
    public static String[] findLeavingCenterLineBeyondstdevWithin2(FArray<Double> arr, Integer limit, BigDecimal center, BigDecimal stdev, Double step) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        int count = 0;
        for (int i = 0; i < arr.length(); i++) {
            if (Math.abs(center.doubleValue() - arr.elementAt(i)) > step * stdev.doubleValue())
                count++;
            if (count == limit)
                for (int j = i - limit + 1; j <= i; j++)
                    result[j] = "判异规则9：连续" + Integer.toString(limit) + "个点偏移"+Double.toString(step)+"个标准差";
            else
                result[i] = "";
        }

        return result;
    }

    //判异10
    public static String[] findLeavingCenterLineBeyondstdevWithin3(FArray<Double> arr, Integer limit1, Integer limit2, BigDecimal center, BigDecimal stdev, Double step) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        int count = 0;

        if (limit1  > arr.length()) {

            for (int i = 0; i < arr.length(); i++) {
                if (Math.abs(center.doubleValue() - arr.elementAt(i)) > step * stdev.doubleValue())
                    count++;

                if (count == limit2)
                    for (int j = i - limit2 + 1; j <= i; j++)
                        result[j] = "判异规则10：连续" + Integer.toString(limit1) + "个点偏移"+Double.toString(step)+"个标准差";
                else
                    result[i] = "";
            }
        } else
            for (int x = 0; x < arr.length(); x++)
                result[x] = "";

        return result;
    }

    //判异11
    public static String[] limitControl(FArray<Double> arr, Double USL, Double LSL) {
        //定义一个result数组，用于存放返回的结果
        String[] result = new String[arr.length()];
        for (int i = 0; i < arr.length(); i++) {
            if (arr.elementAt(i) > USL || arr.elementAt(i) < LSL) {
                result[i] = "判异规则11：超出规格限";
            } else {
                result[i] = "";
            }
        }

        return result;
    }

    public static FArray<String> juge (FArray<Double> arr, BigDecimal center, BigDecimal stdev, Double step1, Integer limit1, Integer limit2,
                                       Integer limit3, Integer limit4, Integer limit5, Integer limit6, Integer limit7, Integer limit8,
                                       Double step2, Integer limit9, Integer limit10, Double step3, Double USL, Double LSL) {
        FArray<String> value = new FArray<String>();

        String[] result = new String[arr.length()];

        String[] result1 = findLeavingCenterLineBeyondstdev(arr, center, stdev, step1);
        String[] result2 = sameSideLine(arr, limit1, center);
        String[] result3 = increaseOrDecrease(arr, limit2);
        String[] result4 = upAndDown(arr, limit3);
        String[] result5 = findLeavingCenterLineBeyondstdevSameSide(arr, limit4, center, stdev);
        String[] result6 = findLeavingCenterLineBeyondstdevSameSide2(arr, limit5, center, stdev);
        String[] result7 = findLeavingCenterLineWithinstdev(arr, limit6, center, stdev);
        String[] result8 = findLeavingCenterLineBeyondstdevWithin(arr, limit7, center, stdev);
        String[] result9 = findLeavingCenterLineBeyondstdevWithin2(arr, limit8, center, stdev, step2);
        String[] result10 = findLeavingCenterLineBeyondstdevWithin3(arr, limit9, limit10, center, stdev, step3);
        String[] result11 = limitControl(arr, USL, LSL);

        for (int i = 0; i < arr.length(); i++) {
            result[i] = result1[i] + "_" + result2[i] + "_" + result3[i] + "_" + result4[i] + "_" + result5[i] + "_" +
                    result6[i] + "_" + result7[i] + "_" + result8[i] + "_" + result9[i] + "_" + result10[i] + "_" + result11[i];

            result[i] = result[i].replaceAll("_+", "_");
            if (result[i].equals("_"))
                result[i] = "";

            if (result[i].startsWith("_"))
                result[i] = result[i].substring(1);

            if (result[i].endsWith("_"))
                result[i] = result[i].substring(0, result[i].length() - 1);

            value.add(result[i]);
        }

        return value;
    }

}
