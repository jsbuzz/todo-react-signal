import React from "react";
import { shallow } from "enzyme";
import {
  TestNameSpace,
  useTestNamespace
} from "../../../react-signal/test-connect";

import { UpdateTodo, RemoveTodo } from "../../signal/events";
import TodoItem from "./TodoItem";

describe("components/TodoItem", () => {
  const todo = {
    id: 191,
    title: "test me!",
    done: false,
    edited: false
  };
  let NS;
  let component;

  beforeEach(() => {
    NS = new TestNameSpace();

    useTestNamespace(NS);

    component = shallow(<TodoItem todo={todo} />);
  });

  describe("WHEN todo is marked as done", () => {
    beforeEach(() => {
      component.setProps({ todo: { ...todo, done: true } });
    });

    it("should match snapshot", () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe("WHEN todo is marked as NOT done", () => {
    it("should match snapshot", () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe("WHEN doubleClicked", () => {
    beforeEach(() => {
      component.find("li").simulate("doubleClick");
    });

    it("should trigger UpdateTodo with edited: true", () => {
      expect(NS.lastEvent).toBeInstanceOf(UpdateTodo);
      expect(NS.lastEvent.todo).toEqual({
        ...todo,
        edited: true
      });
    });
  });

  describe("WHEN checkbox is checked", () => {
    beforeEach(() => {
      component.find("CheckBox").simulate("change");
    });

    it("should trigger UpdateTodo with done: true", () => {
      expect(NS.lastEvent).toBeInstanceOf(UpdateTodo);
      expect(NS.lastEvent.todo).toEqual({
        ...todo,
        done: true
      });
    });
  });

  describe("WHEN checkbox is unchecked", () => {
    beforeEach(() => {
      component.setProps({ todo: { ...todo, done: true } });
      component.find("CheckBox").simulate("change");
    });

    it("should trigger UpdateTodo with done: false", () => {
      expect(NS.lastEvent).toBeInstanceOf(UpdateTodo);
      expect(NS.lastEvent.todo).toEqual({
        ...todo,
        done: false
      });
    });
  });

  describe("WHEN destroy button is clicked", () => {
    beforeEach(() => {
      component.find("button").simulate("click");
    });

    it("should trigger RemoveTodo with the right id", () => {
      expect(NS.lastEvent).toBeInstanceOf(RemoveTodo);
      expect(NS.lastEvent.id).toEqual(todo.id);
    });
  });
});
