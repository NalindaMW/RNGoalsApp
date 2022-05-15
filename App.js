import { useState } from "react";
import { StyleSheet, View, TextInput, Button, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [myGoals, setMyGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    setMyGoals((currentMyGoals) => [
      ...currentMyGoals,
      { title: enteredGoalText, id: Math.random().toString() },
    ]);
    dismissAddGoalModalHandler();
  }

  function deleteGoalHandler(id) {
    setMyGoals((currentMyGoals) => {
      return currentMyGoals.filter((goal) => goal.id != id);
    });
  }

  function launchAddGoalModalHandler() {
    setIsModalVisible(true);
  }

  function dismissAddGoalModalHandler() {
    setIsModalVisible(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#b180f0"
          onPress={launchAddGoalModalHandler}
        />
        <GoalInput
          visible={isModalVisible}
          onAddGoal={addGoalHandler}
          onCancel={dismissAddGoalModalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={myGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  id={itemData.item.id}
                  title={itemData.item.title}
                  onDeleteGoal={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "#311b6b",
  },
  goalsContainer: {
    flex: 5,
  },
});
