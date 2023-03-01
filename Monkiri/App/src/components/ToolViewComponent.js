import React, { useState, useRef, useEffect } from "react";

import {
    View,
    Text,
    TextInput,
    Picker,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image
} from "react-native";
import { styles } from "./Calculator/styles";
import Slider from "@react-native-community/slider";
import Colors from '../values/Colors';
import SimpleProgress from './SimpleProgressComponent';

const ToolViewComponent = ({ navigation }) => {
    const [principal, setPrincipal] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [period, setPeriod] = useState(4);
    const [time, setTime] = useState(1);
    const [total, setTotal] = useState("");
    const [isSumbit, setIsSubmit] = useState(false);
    const [isError, setIsError] = useState(false);
    const focusRef = useRef();
    const scrollRef = useRef();
    const { width } = Dimensions.get("window");

    useEffect(() => {
        calculateInterest(principal, interestRate, period, time);
    });
    const updateTime = time => {
        const intTime = Math.floor(time);
        setTime(intTime);
    };
    const updateInterest = interest => {
        setInterestRate(interest);
    };
    const updatePrincipal = principal => {
        setPrincipal(principal);
    };
    const updatePeriod = period => {
        setPeriod(period);
        setTimeout(() => {
            scrollRef.current.scrollToEnd({ animated: true });
        }, 10);
    };
    const calculateInterest = (principal, interestRate, period, time) => {
        setIsSubmit(true);
        const pow = Math.pow(1 + (interestRate * 0.01) / period, period * time);
        const result = Number.parseFloat(principal * pow).toFixed(2);
        if (isNaN(result)) {
            setIsError(true);
        } else {
            setIsError(false);
            setTotal(result);
        }
    };

    const convertPeriod = period => {
        if (period === 1) {
            return "Annually";
        } else if (period === 2) {
            return "Semi-Annually";
        } else if (period === 4) {
            return "Quarterly";
        } else if (period === 6) {
            return "Bi-Monthly";
        } else if (period === 12) {
            return "Monthly";
        } else if (period === 24) {
            return "Semi-Monthly";
        }
    };


    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={styles.content}
            ref={scrollRef}
        >
            <Text style={styles.header}> Compound Interest Calculator </Text>
            <Text style={styles.checkin}>Try it!</Text>

            <View style={styles.principal}>
                <TextInput
                    value={principal}
                    style={styles.input}
                    onChangeText={updatePrincipal}
                    placeholder="Type Your Principal Here "
                    ref={focusRef}
                />
                <Image
                    style={styles.inputIcon}
                    source={require("../res/assets/images/dollar.png")}
                />
            </View>
            <View style={styles.interest}>
                <TextInput
                    value={interestRate}
                    style={styles.input}
                    onChangeText={updateInterest}
                    placeholder="Type Your Interest Here"
                />
                <Image
                    style={styles.inputIcon}
                    source={require("../res/assets/images/percentage.png")}
                />
            </View>
            <View style={styles.compound}>
                <Text style={styles.title}>Interest is compounded: </Text>
                <Picker
                    selectedValue={period}
                    onValueChange={itemValue => updatePeriod(itemValue)}
                    style={styles.picker}
                    itemStyle={{ fontSize: 18 }}
                >
                    <Picker.Item label="Semi-Monthly(24/Year)" value={24} />
                    <Picker.Item label="Monthly(12/Year)" value={12} />
                    <Picker.Item label="Bi-Monthly(6/Year)" value={6} />
                    <Picker.Item label="Quarterly(4/Year)" value={4} />
                    <Picker.Item label="Semi-Annually(2/Year)" value={2} />
                    <Picker.Item label="Annually(1/Year)" value={1} />
                </Picker>
            </View>
            <View style={styles.sliderContainer}>
                <Text style={styles.title}>
                    {time}
                    {time <= 1 ? " year " : " years "}to grow:{" "}
                </Text>
                <View style={styles.sliderContent}>
                    <Text>1</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={50}
                        maximumTrackTintColor={Colors.primary}
                        onValueChange={updateTime}
                        value={time}
                    />
                    <Text>50</Text>
                </View>
            </View>
            <View style={styles.result}>
                {isSumbit && !isError ? (
                    <View>
                        <Text style={styles.result}>
                            Your initial investment of
              <Text style={styles.highlight}> ${principal}</Text> at an
                                                                annualized interest rate of
              <Text style={styles.highlight}> {interestRate}%</Text>
                            will be worth<Text style={styles.highlight}> ${total} </Text>
                            ,after
              <Text style={styles.highlight}> {time} </Text> years when
                                                                compounded
              <Text style={styles.highlight}> {convertPeriod(period)}</Text>.
            </Text>
                    </View>
                ) : isError ? (
                    <Text style={styles.error}>Invalid Input!</Text>
                ) : null}
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("STAGECOMPLETE", {
                            handleComplete: navigation.state.params.handleComplete
                        });
                    }}
                    style={[styles.burronShadow, styles.orangeButtonContainer]}
                >
                    <Text style={styles.orangeButtonText}>Finish</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>);
}

export default ToolViewComponent;