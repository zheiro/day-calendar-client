import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { colors, zIndex } from 'material-ui/styles';

export default class Activity extends Component {
	static propTypes = {
		activity: PropTypes.arrayOf(PropTypes.object),
		activityStyle: PropTypes.object,
		style: PropTypes.object,
		onClick: PropTypes.func
	}

	static defaultProps = {
		text: "Insert Activity Here",
		style: {
			display: 'flex',
			width: 250,
			position: 'absolute',
			top: 0
		},
		activityStyle: {
			borderLeft: `3px solid ${colors.blue400}`,
			backgroundColor: colors.grey200,
			fontSize: 12
			// flex: 1
		}
	}

	render() {
		// let flex = this.props.activity.length;
		return (
			// <div style={{ ...this.props.style, flex: flex }}>
			<div style={{ ...this.props.style }}>
				{
					this.props.activity.map((act) => {
						return (
							<div
								onClick={this.props.onClick ? this.props.onClick.bind(this, act) : null}
								style={{
									...this.props.activityStyle,
									height: (1.5 * act.duration),
									marginTop: (1.515 * act.start),
									width: (250 / this.props.activity.length),
									zIndex: 100,
									cursor: 'pointer'
								}}>
								<div
									style={{
										marginLeft: 5,
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
									}}
								>
									{act.title}
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}
}