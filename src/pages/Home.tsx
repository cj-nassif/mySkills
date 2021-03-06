import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    FlatList,
    Keyboard
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
}

export function Home() {

    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greeting, setGreeting] = useState('');

    function handleSaveNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldState => [...oldState, data])
        setNewSkill('')
        Keyboard.dismiss()

    }

    function handleRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id))
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
            <Text style={styles.title} testID='welcome'>
                Welcome, Nassif!
            </Text>

            <Text style={styles.greeting}>
                {greeting}
            </Text>

            <TextInput
                testID='input-new'
                style={styles.input}
                value={newSkill}
                placeholder='New skill'
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
            />

            <Button
                testID='button-add'
                title='Add'
                onPress={handleSaveNewSkill}
            />
            <Text style={[styles.title, { marginVertical: 15 }]}>
                My Skills
            </Text>
            {
                mySkills &&
                <FlatList
                    testID='flat-list-skills'
                    data={mySkills}
                    keyboardShouldPersistTaps='never'
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <SkillCard
                            skill={item.name}
                            onPress={() => handleRemoveSkill(item.id)}

                        />
                    )}
                />
            }


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
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
    greeting: {
        color: '#fff'
    }

})