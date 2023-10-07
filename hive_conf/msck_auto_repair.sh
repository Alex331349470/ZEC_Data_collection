#!/bin/bash
PATH=$PATH:$HOME/.local/bin:$HOME/bin
export PATH

export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
export PATH=JAVA_HOME/bin:$PATH

export HADOOP_HOME=/home/alex/hadoop-3.3.5
export PATH=$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH

export HIVE_HOME=/home/alex/apache-hive-3.1.3-bin
export PATH=$PATH:$HIVE_HOME/bin

echo "Starting the msck repair cronjob"
hive -e 'msck repair table kiln;msck repair table auto_line;msck repair table air_powder;msck repair table coulter_mixer;msck repair table filter_press;msck repair table fluid_tank;msck repair table micro_wave;msck repair table pneumatic_convery;msck repair table roller;msck repair table weighbrige;msck repair table silver_ribbon_mixer;msck repair table iron_remover;msck repair table pack_contact;msck repair table smart_200_dehumidifier;msck repair table alpi_mechanical_powder;msck repair table lipu_mechanical_powder;msck repair table air_compressor;msck repair table monitor_thermometer'
echo "Cron job ends"
