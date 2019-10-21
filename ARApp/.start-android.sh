export ANDROID_HOME=$HOME/Android/Sdk; 
export PATH=$PATH:$ANDROID_HOME/emulator; 
export PATH=$PATH:$ANDROID_HOME/tools; 
export PATH=$PATH:$ANDROID_HOME/tools/bin; 
export PATH=$PATH:$ANDROID_HOME/platform-tools;
adb reverse tcp:8081 tcp:8081;
react-native run-android --variant=gvrDebug