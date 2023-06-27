import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledText from '../../StyledText';

const CheckoutButton: React.FC = () => {
    const [basket, setBasket] = useState<any[]>([]);

    const addBasketItem = async (item) => {
        try {
            let updatedBasket = [...basket, item];
            await AsyncStorage.setItem('basket', JSON.stringify(updatedBasket));
            setBasket(updatedBasket);
        } catch (error) {
            // Handle error if necessary
        }
    };

    const handlePress = () => {
        console.log('Honk!')    
    }

    return basket.length > 0 ? (
        <View style={styles.checkoutContainer}>
            <Button title="Proceed to Checkout" color="#3498db" onPress={handlePress} />
        </View>
    ) : (
        <View style={styles.emptyBasket}>
            <StyledText style={styles.emptyText}>Your basket is empty.</StyledText>
            <StyledText style={styles.shoppingText}>Start Shopping!</StyledText>
        </View>
    );
};

const styles = StyleSheet.create({
    checkoutContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
    },
    emptyBasket: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        color: '#333',
    },
    shoppingText: {
        fontSize: 18,
        color: '#007AFF',
    }
});

export default CheckoutButton;
