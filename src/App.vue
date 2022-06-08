<template>
	<div id="app">
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container-fluid">
				<router-link to="/" class="navbar-brand">Tasks List</router-link>
			</div>
		</nav>
		<div class="container">
			<br>
			<div class="input-group mb-3">
				<input type="text" class="form-control" placeholder="New Task" v-model="TaskModel.text">
				<button @click="saveTask" class="btn btn-outline-secondary" type="button" id="button">Save</button>
			</div>
			
			<div v-if="submitted">
				<div class="alert alert-info alert-dismissible fade show" role="alert">
					Save task successfully!
					<button @click="closeAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>
			</div>
			
			<br>
			<table class="table">
				<thead>
					<tr>
					<th scope="col">Task</th>
					<th scope="col">State</th>
					<th scope="col"></th>
					</tr>
				</thead>
				<tbody v-for="(task, index) in tasks" :key="index">
					<tr>
						<td>{{task.text}}</td>
						<td>
							<div v-if="task.finished">
								<button @click="updateTask(task.id)" type="button" class="btn btn-outline-success">finished</button>
							</div>
							<div v-else>
								<button @click="updateTask(task.id)" type="button" class="btn btn-outline-info">in progress</button>
							</div>
						</td>
						<td>
							<button @click="deleteTask(task.id)" type="button" class="btn btn-outline-danger">Delete</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import TasksDataService from './services/TasksDataService'

export default {
	name: 'App',
	data() {
		return {
			TaskModel: {text : ""},
			submitted: false,
			tasks: []
		}
	},
	methods: {
		saveTask() {
			let data = {text: this.TaskModel.text}
			TasksDataService.create(data)
				.then(this.submitted = true, this.retrieveTasks())
				.catch( e => {alert(e)});
		},
		updateTask(id) {
			TasksDataService.update(id)
				.then(this.retrieveTasks())
				.catch( e => {alert(e)});
		},
		deleteTask(id) {
			TasksDataService.delete(id)
				.then(this.retrieveTasks())
				.catch( e => {alert(e)});
		},
		retrieveTasks() {
			TasksDataService.getAll()
				.then(response => {this.tasks = response.data})
				.catch(e => {alert(e)})
		},
		closeAlert() {
			this.submitted = false
		}
	},
	mounted() {
		this.retrieveTasks()
	}
}
</script>

