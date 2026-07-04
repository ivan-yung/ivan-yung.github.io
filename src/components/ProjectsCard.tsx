import { useEffect, useRef, useState } from 'react'

function RepoIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path
				fill="currentColor"
				d="M4 3.75A2.75 2.75 0 0 1 6.75 1h10.5A2.75 2.75 0 0 1 20 3.75v16.5A2.75 2.75 0 0 1 17.25 23H7a1 1 0 0 1-.9-.56L4.1 18.44A2.75 2.75 0 0 1 3 16.25V3.75Zm2.75-.75a.75.75 0 0 0-.75.75v12h2.25a1 1 0 0 1 1 1V21h8a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75H6.75Zm1.5 13.5H6v1.25c0 .41.22.79.58.99l1.67.93v-3.17Zm4.75-9a1 1 0 0 1 1-1h2.5a1 1 0 0 1 0 2H13a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h4.5a1 1 0 0 1 0 2H12a1 1 0 0 1-1-1Z"
			/>
		</svg>
	)
}

type ProjectsCardProps = {
	title: string
	description: string
	tech: string[]
	liveUrl?: string
	repoUrl?: string
	videoSrc?: string
	imageSrc?: string
	mediaAlt?: string
	mediaMode?: 'video' | 'image'
}

export default function ProjectsCard({
	title,
	description,
	tech,
	liveUrl,
	repoUrl,
	videoSrc,
	imageSrc,
	mediaAlt = `${title} preview`,
	mediaMode,
}: ProjectsCardProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const previewTimeoutRef = useRef<number | null>(null)
	const [isVideoPreviewActive, setIsVideoPreviewActive] = useState(false)
	const showImage = mediaMode === 'image' || !videoSrc || !isVideoPreviewActive

	const clearPreviewTimeout = () => {
		if (previewTimeoutRef.current === null) return
		window.clearTimeout(previewTimeoutRef.current)
		previewTimeoutRef.current = null
	}

	const handleVideoEnter = () => {
		clearPreviewTimeout()
		setIsVideoPreviewActive(true)
	}

	const handleVideoLeave = () => {
	}

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		if (!isVideoPreviewActive) {
			video.pause()
			video.currentTime = 0
			return
		}

		video.currentTime = 0
		void video.play().catch(() => {
			setIsVideoPreviewActive(false)
		})

		clearPreviewTimeout()
		previewTimeoutRef.current = window.setTimeout(() => {
			setIsVideoPreviewActive(false)
		}, 5000)

		return () => {
			clearPreviewTimeout()
		}
	}, [isVideoPreviewActive])

	useEffect(() => {
		return () => {
			clearPreviewTimeout()
		}
	}, [])

	return (
		<article className="project-card">
			<div className="terminal-window">
				<div className="terminal-header">
					<span className="terminal-title-tab">{title}.ps1</span>
				</div>
				<div className="terminal-content">
					<div
						className="project-media"
						onMouseEnter={handleVideoEnter}
						onMouseLeave={handleVideoLeave}
					>
						{showImage ? (
							<img src={imageSrc} alt={mediaAlt} className="project-media-image" loading="lazy" />
						) : (
							<video
								ref={videoRef}
								src={videoSrc}
								className="project-media-video"
								muted
								playsInline
								loop
								preload="metadata"
								poster={imageSrc}
							/>
						)}
					</div>

					<div className="terminal-body">
						<h3 className="project-card-title">{title}</h3>
						<p className="project-card-description">{description}</p>

						<ul className="project-tech-list" aria-label={`${title} technologies`}>
							{tech.map((item) => (
								<li key={item} className="project-tech-item">
									{item}
								</li>
							))}
						</ul>

						<div className="project-card-links">
							{liveUrl && (
								<a href={liveUrl} target="_blank" rel="noreferrer" className="project-link">
									Live Demo
								</a>
							)}
							{repoUrl && (
								<a href={repoUrl} target="_blank" rel="noreferrer" className="project-link project-repo-link">
									<RepoIcon />
									<span>View Repo</span>
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}
