import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#ddd"
			}}
		>
			<Text>Home!</Text>
		</View>
	);
}

function SettingsScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#dd3"
			}}
		>
			<Text>Settings!</Text>
		</View>
	);
}

function ProfileScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#d55"
			}}
		>
			<Text>Profile!</Text>
		</View>
	);
}

function MyTabBar({ state, descriptors, navigation }) {
	return (
		<View
			style={{
				backgroundColor: "white",
				width: "85%",
				height: 50,
				alignSelf: "center",
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",
				position: "absolute",
				bottom: 30,
				borderRadius: 30,
				shadowColor: "black",
				shadowOpacity: 0.2,
				shadowRadius: 10,
				shadowOffset: {
					width: 0,
					height: 3
				}
			}}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const icon =
					options.tabBarIcon !== undefined
						? options.tabBarIcon
						: null;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				return (
					<TouchableOpacity
						key={`justsomestring${index}`}
						accessibilityRole="button"
						accessibilityStates={isFocused ? ["selected"] : []}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						style={{
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							paddingHorizontal: 5
						}}
					>
						{icon({ color: isFocused ? "#8c1212" : "#e2b1b1" })}

						<Text
							style={{ color: isFocused ? "#8c1212" : "#e2b1b1" }}
						>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					activeTintColor: "#e91e63"
				}}
				tabBar={props => <MyTabBar {...props} />}
			>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<Entypo name={"home"} color={color} size={20} />
						)
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={SettingsScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<Ionicons
								name={"md-settings"}
								color={color}
								size={20}
							/>
						)
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={ProfileScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<Entypo name={"user"} color={color} size={20} />
						)
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
