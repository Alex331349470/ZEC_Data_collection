#!/bin/bash
PATH=$PATH:$HOME/.local/bin:$HOME/bin
export PATH

export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
export PATH=JAVA_HOME/bin:$PATH

export HADOOP_HOME=/home/alex/hadoop-3.3.5
export PATH=$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH

export HIVE_HOME=/home/alex/apache-hive-3.1.3-bin
export PATH=$PATH:$HIVE_HOME/bin

echo "$(date '+%F %T') (msck) Starting the msck repair cronjob"
hive -e 'msck repair table kiln;msck repair table auto_line;msck repair table air_powder;msck repair table coulter_mixer;msck repair table filter_press;msck repair table fluid_tank;msck repair table micro_wave;msck repair table pneumatic_convery;msck repair table roller;msck repair table weighbrige;msck repair table silver_ribbon_mixer;msck repair table iron_remover;msck repair table pack_contact;msck repair table smart_200_dehumidifier;msck repair table alpi_mechanical_powder;msck repair table lipu_mechanical_powder;msck repair table air_compressor;msck repair table monitor_thermometer;msck repair table s1200_dehumidifier;msck repair table hong_ribbon_mixer;msck repair table kiln_jp;                           msck repair table yl_autoline; msck repair table yl_coulter_mixer; msck repair table yl_dehumidifier; msck repair table yl_disc_mill; msck repair table yl_filter_press; msck repair table yl_iron_remover; msck repair table yl_jet_mill; msck repair table yl_kiln; msck repair table yl_kiln_drive_cabinet; msck repair table yl_kiln_drive_cabinet_air; msck repair table yl_kiln_drive_cabinet_atmosphere; msck repair table yl_kiln_temperature_control_room; msck repair table yl_kiln_test; msck repair table yl_micro_wave; msck repair table yl_pack_mixer; msck repair table yl_pl_mixer; msck repair table yl_pneumatic_convery; msck repair table yl_roller; msck repair table yl_vortex_mill; '
echo "$(date '+%F %T') (msck) Cron job ends"