package com.fr.function;

import com.fr.script.AbstractFunction;

public class NormDist extends AbstractFunction {
    public Object run (Object[] args) {
        return cdf ((Double) args[0], (Double) args[1],(Double) args[2]);
    }

    public static double cdf(double x, double mean, double stdDev) {
        double z = (x -mean) / stdDev;
        return (1.0 + erf(z / Math.sqrt(2.0))) / 2.0;
    }

    private static double erf (double z) {
        double t = 1.0 / (1.0 + 0.5 * Math.abs(z));
        double ans = 1.0 - t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
                t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * (0.17087277))))))))));

        if (z >= 0.0)
            return ans;
        else
            return -ans;
    }
}