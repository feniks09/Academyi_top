import { create } from 'zustand';

const sortByDate = (list) =>
  [...list].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

export const useActivityStore = create((set) => ({
  activities: [],

  addActivity: (activity) =>
    set((state) => ({
      activities: sortByDate([...state.activities, activity]),
    })),

  updateActivity: (id, updatedData) =>
    set((state) => ({
      activities: sortByDate(
        state.activities.map((act) =>
          act.id === id ? { ...act, ...updatedData } : act
        )
      ),
    })),

  removeActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((act) => act.id !== id),
    })),
}));

// Селекторы — чистые функции, возвращают ссылки без создания новых объектов
export const selectActivities = (state) => state.activities;

export const selectActivityById = (id) => (state) =>
  state.activities.find((a) => a.id === id);