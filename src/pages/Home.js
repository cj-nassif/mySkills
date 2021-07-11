import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    FlatList
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';


export function Home() {

    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState([]);
    const [greeting, setGreeting] = useState('');

    function handleSaveNewSkill() {
        setMySkills(oldState => [...oldState, newSkill])
        setNewSkill('')
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGreeting('Good morning')
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good afternoon')
        } else {
            setGreeting('Good night')
        }

    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome, Nassif!
            </Text>

            <Text style={styles.greeting}>
                {greeting}
            </Text>

            <TextInput
                style={styles.input}
                value={newSkill}
                placeholder='New skill'
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
            />

            <Button
                onPress={handleSaveNewSkill}
            />
            <Text style={[styles.title, { marginVertical: 15 }]}>
                My Skills
            </Text>
            <FlatList
                data={mySkills}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <SkillCard
                        skill={item}

                    />
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 20,
        paddingVertical: 70,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',

    },
    input: {
        backgroundColor: '#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS == 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7,

    },
    buttonSkill: {
        backgroundColor: '#1f1e25',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 10,

    },
    textSkill: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    greeting: {
        color: '#fff'
    }

})