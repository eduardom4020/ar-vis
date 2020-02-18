import React, { useState } from 'react';
import { View, Text, Button, TextInput, SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    overlay: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        padding: 16
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: 0
    }
});

const ValueInput = props => (
    <TextInput 
        style={styles.input} 
        maxLength={2}
        keyboardType='number-pad'
        {...props}
    />
);

export default props => {
    const { addPoint=()=>null } = props;
    const [ x, setX ] = useState('');
    const [ y, setY ] = useState('');
    const [ z, setZ ] = useState('');

    return (
        <SafeAreaView style={styles.overlay} >
            <View style={styles.formRow} >
                <Text>X:</Text>
                <ValueInput
                    onChangeText={setX}
                    value={x}
                />
                <Text>Y:</Text>
                <ValueInput
                    onChangeText={setY}
                    value={y}
                />
                <Text>Z:</Text>
                <ValueInput
                    onChangeText={setZ}
                    value={z}
                />
                <Button
                    title='Add'
                    onPress={() => {
                        addPoint({x: Number(x), y: Number(y), z: Number(z)});
                        setX('');
                        setY('');
                        setZ('');
                    }}
                />
            </View>
        </SafeAreaView>
    );
};