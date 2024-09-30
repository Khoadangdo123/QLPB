// DetailTask.jsx
import React, { useEffect, useState } from 'react';

const DetailTask = ({ 
	expanded, 
	setExpanded, 
	task,
	titleTask,
	name,
	date,
	userTeam,
	roleTeam
}) => {

  return (
		<>
			<div
				className={`fixed top-0 right-0 h-full bg-white shadow-lg w-1/2 transform ${
					expanded ? "translate-x-0" : "translate-x-full"
				} transition-transform duration-300 ease-in-out`}
				style={{
					position: "absolute",
					zIndex: 10,
					borderLeft: "1px solid #e5e7eb",
				}}
			>
				{/* Close button */}
				<div className="flex justify-end p-4">
					<button
						className="text-gray-500 hover:text-gray-700 focus:outline-none"
						onClick={() => setExpanded(false)}
					>
						✖️
					</button>
				</div>

				{/* Task Title */}
				<div className="mb-6 px-6">
					<h2 className="text-2xl font-semibold text-gray-800">{titleTask}</h2>
				</div>

				{/* Assignee and Due Date */}
				<div className="mb-6 px-6 flex justify-between items-center">
					<div className="flex items-center">
						<div className="rounded-full h-10 w-10 bg-purple-600 flex items-center justify-center text-xl text-white">
							{roleTeam[0]?.name?.slice(0,2)}
						</div>
						<span className="ml-3 text-gray-700">{roleTeam[0]?.email}</span>
					</div>
					<div className="flex items-center">
						<span className="text-red-600 mr-3 text-sm">{date}</span>
						<span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs">
							Limited access
						</span>
					</div>
				</div>

				{/* Project Section */}
				<div className="mb-6 px-6">
					<div className="flex items-center">
						<span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm">
							.NET
						</span>
						<span className="ml-3 text-gray-600">Untitled section</span>
					</div>
				</div>

				{/* Dependencies */}
				<div className="mb-6 px-6">
					<p className="text-gray-700 font-medium">Dependencies</p>
					<button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 mt-2 rounded-full focus:outline-none">
						Add dependencies
					</button>
				</div>

				{/* Description */}
				<div className="mb-6 px-6">
					<p className="text-gray-700 font-medium">Description</p>
					<textarea
						className="w-full bg-gray-50 p-3 mt-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="What is this task about?"
						rows="4"
					></textarea>
				</div>

				{/* Comments Section */}
				<div className="mb-6 px-6">
					<div className="flex items-center">
						<input
							className="w-full bg-gray-50 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Add a comment"
						/>
						<button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full ml-3 focus:outline-none">
							Send
						</button>
					</div>
				</div>

				{/* Collaborators Section */}
				<div className="mb-6 px-6">
					<div className="flex justify-between items-center">
						<div className="flex items-center">
							<span className="text-gray-700 font-medium">Collaborators:</span>
							<div className="flex -space-x-2 ml-3">
								{
									userTeam?.team?.map((m, index) => {
										return (
											<>
												<div className="rounded-full h-8 w-8 bg-purple-500 flex items-center justify-center text-xs text-white">
													{m.name.slice(0,2)}
												</div>
											</>
										)
									})
								}
								<div 
									style={{
										cursor: 'pointer'
									}}
									className="rounded-full h-8 w-8 bg-gray-400 flex items-center justify-center text-xs text-white"
								>
									+
								</div>
							</div>
						</div>
						<button className="text-gray-600 hover:text-red-500 flex items-center focus:outline-none">
							<span className="mr-1">Leave task</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M4 5a3 3 0 013-3h6a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V5zm7.293 2.293a1 1 0 00-1.414 1.414L10.586 10l-1.707 1.707a1 1 0 001.414 1.414L12 11.414l1.707 1.707a1 1 0 001.414-1.414L13.414 10l1.707-1.707a1 1 0 00-1.414-1.414L12 8.586 10.293 6.707z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Footer Actions */}
				<div className="px-6 pb-6 flex justify-between items-center">
					<button
						className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none"
						onClick={() => setExpanded(false)}
					>
						Cancel
					</button>
					<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full focus:outline-none">
						Mark Complete
					</button>
				</div>
			</div>

		</>
  );
};

export default DetailTask;
