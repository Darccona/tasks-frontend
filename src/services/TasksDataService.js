import http from '../http-common'

class TasksDataService {
    getAll() {
        return http.get('/tasks')
    }

    create(data) {
        return http.post('/tasks', data)
    }

    update(id) {
        return http.put(`/tasks/${id}`)
    }

    delete(id) {
        return http.delete(`/tasks/${id}`)
    }
}

export default new TasksDataService()