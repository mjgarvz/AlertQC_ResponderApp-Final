import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'

const HeaderMenu = props => {
    return (
        <HeaderButton 
        {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={Colors.primaryBlue}
        />
    );
};

export default HeaderMenu;
