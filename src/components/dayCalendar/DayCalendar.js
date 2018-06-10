import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { TimeSlot, Activity } from '.';
import { CalendarActions } from '../../actions';
import { PromptBox, TimeInput } from '../common';
import { TextField, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import moment from 'moment';
import MessageBox from '../common/MessageBox';
import { Paths } from '../../enums';

const leftHourTimes = [
	8,
	9,
	10,
	11,
	12
]

const rightHourTimes = [
	1,
	2,
	3,
	4,
	5
]

class DayCalendar extends Component {

	state = {
		conflict: null,
		openEditBox: false,
		selectedActivity: null,
	}

	async componentWillMount() {
		if (!sessionStorage.getItem('@@mc/USERID')) {
			this.props.history.push(Paths.LOGIN);
		} else {
			let segmentedSchedule = this._segmentSchedule(await this.props.getSchedule());

			let morningActivities = this._mergeConflict(segmentedSchedule.morningActivities);
			let afternoonActivities = this._mergeConflict(segmentedSchedule.afternoonActivities);

			this.setState({
				morningActivities: morningActivities,
				afternoonActivities: afternoonActivities
			})
		}
	}

	_mergeConflict(schedule) {

		let activities = [];
		let marker = null;

		for (let i = 0; i < schedule.length; i++) {
			if (schedule[i + 1]) {
				if ((schedule[i].start + schedule[i].duration) > (schedule[i + 1].start)) {
					if (!marker) {
						marker = i;
					}
				} else if (marker) {
					activities.push(schedule.slice(marker, i + 1));
					marker = null;
				} else {
					activities.push(schedule.slice(i, i + 1));
				}
			} else if (marker) {
				activities.push(schedule.slice(marker, i + 1));
			} else {
				activities.push([schedule[i]]);
			}
		}

		return activities;
	}

	_segmentSchedule(schedule) {
		let morningActivities = [];
		let afternoonActivities = [];

		if (schedule) {
			for (let i = 0; i < schedule.length; i++) {
				if (schedule[i].start < 300) {
					if (schedule[i].start + schedule[i].duration < 300) {
						morningActivities.push(schedule[i]);
					} else {
						let morningPart = {
							...schedule[i],
							duration: 300 - schedule[i].start,
						}

						let afterNoonPart = {
							// start: 300,
							...schedule[i],
							start: 0,
							duration: schedule[i].duration - (300 - schedule[i].start),
						}

						morningActivities.push(morningPart);
						afternoonActivities.push(afterNoonPart);
					}
				} else {
					schedule[i].start = schedule[i].start - 300;
					afternoonActivities.push(schedule[i]);
				}
			}

			return { morningActivities, afternoonActivities }
		}

	}

	render() {
		return (
			<div style={{ backgroundColor: 'white', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
				<div style={{ display: 'flex', justifyContent: 'center', height: 100, alignItems: 'center' }}>
					My Day Schedule
				</div>
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
					<div>
						<div style={{ position: 'absolute', marginLeft: 60, marginTop: 10 }}>
							{
								this.state.morningActivities ?
									this.state.morningActivities.map((activity) => {
										return <Activity activity={activity} onClick={this._handleOpenEdit.bind(this)} />
									})
									: null
							}
						</div>
						<div style={{ margin: 10 }}>
							<div>
								{
									leftHourTimes.map((hourTime) => {
										return <TimeSlot time={hourTime} midSlot={true} />
									})
								}
							</div>
						</div>
					</div>
					<div>
						<div style={{ position: 'absolute', marginLeft: 60, marginTop: 10 }}>
							{
								this.state.afternoonActivities ?
									this.state.afternoonActivities.map((activity) => {
										return <Activity activity={activity} onClick={this._handleOpenEdit.bind(this)} />
									})
									: null
							}
						</div>
						<div style={{ margin: 10 }}>
							{
								rightHourTimes.map((hourTime) => {
									if (hourTime == 5) {
										return <TimeSlot time={hourTime} midSlot={false} />
									} else {
										return <TimeSlot time={hourTime} midSlot={true} />
									}

								})
							}
						</div>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<FloatingActionButton
								onClick={this._handleOpenAdd.bind(this)}
							>
								<ContentAdd />
							</FloatingActionButton>
						</div>
					</div>
					<PromptBox
						open={this.state.openPrompt}
						title="Edit Activity"
						message={
							<div>
								<TimeInput
									handleTime={this._handleTime.bind(this)}
									initialTime={this.state.selectedActivity ? this.state.selectedActivity.start : null}
								/>
								{
									this.state.selectedActivity ?
										this.state.selectedActivity.startError ? "Please choose a time between 8:00 AM and 5:00 PM" : null
										: null
								}
								<TextField
									floatingLabelText="Duration in minutes"
									value={this.state.selectedActivity ? this.state.selectedActivity.duration : null}
									onChange={(event, value) => {
										this.state.selectedActivity ?
											this.setState({
												selectedActivity: { ...this.state.selectedActivity, duration: this._handleDuration(value) }
											}) : null
									}}
								/>
								<TextField
									floatingLabelText="Activity Title / Description"
									multiLine={true}
									fullWidth={true}
									value={this.state.selectedActivity ? this.state.selectedActivity.title : null}
									onChange={(event, value) => {
										this.state.selectedActivity ?
											this.setState({
												selectedActivity: { ...this.state.selectedActivity, title: value }
											}) : null
									}}
								/>
							</div>
						}
						action="Update"
						handleAction={this._handleEdit.bind(this)}
						handleCancel={this._handleCloseEdit.bind(this)}
					/>
					<MessageBox />
				</div>
			</div>
		)
	}

	_handleEdit() {
		this.state.action ?
			this.state.action == 'edit' ?
				this.props.updateActivity(this.state.selectedActivity)
				: this.props.addActivity(this.state.selectedActivity)
			: null
	}

	_handleTime(time) {
		let minTime = moment('07:59', 'HH:mm');
		let chosenTime = moment(time, 'HH:mm');
		let maxTime = moment('17:01', 'HH:mm');

		if (chosenTime.isBetween(minTime, maxTime)) {
			let chosenTimeMinutes = chosenTime.hours() * 60 + chosenTime.minutes();
			this.setState({
				selectedActivity: {
					...this.state.selectedActivity,
					start: chosenTimeMinutes - 480,
					startError: null
				}
			})
		} else {
			this.setState({
				selectedActivity: {
					...this.state.selectedActivity,
					startError: true
				}
			})
		}
	}

	_handleDuration(duration) {
		return duration.replace(/[^0-9\.]+/g, '').replace(/[\W_]+/g, '');
	}


	_handleOpenEdit(activity) {
		this.setState({
			openPrompt: true,
			selectedActivity: activity,
			action: 'edit'
		})
	}

	_handleOpenAdd() {
		this.setState({
			openPrompt: true,
			action: 'add'
		})
	}

	_handleCloseEdit() {
		this.setState({
			openPrompt: false,
			selectedActivity: null
		})
	}
}

export default connect(
	state => ({
		schedule: state.calendar.schedule
	}),
	dispatch => ({
		getSchedule() {
			return dispatch(CalendarActions.getSchedule());
		},
		updateActivity(activity) {
			dispatch(CalendarActions.updateActivity(activity));
		},
		addActivity(activity) {
			dispatch(CalendarActions.addActivity(activity));
		}
	})
)(withRouter(DayCalendar))