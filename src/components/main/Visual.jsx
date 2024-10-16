.visual {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	position: relative; //내부 swiper로 인해 가로, 세로 스크롤 생기는 문제 해결

	.textBox {
		position: absolute;
		width: 30%;
		left: 5%;
		top: 30%;

		h2 {
			position: absolute;
			top: 0px;
			left: 0px;
			opacity: 0;
			transform: scale(2);
			font: 100 5vmax/1 'raleway';
			color: #333;
			transition: 0.5s;

			&.on {
				opacity: 1;
				transform: scale(1);
			}
		}
	}

	.swiper {
		width: 100%;
		height: 100%;
		position: relative;
		left: 200px;
		z-index: 5;

		.swiper-wrapper {
			width: 100%;
			height: 100%;
			padding: 20vh 0px;
			box-sizing: border-box;

			.swiper-slide {
				width: 100%;
				height: 100%;

				.inner {
					width: 100%;
					height: 100%;
					opacity: 0;
					transform: scale(0.3);
					transition: 0.5s;
				}

				//이전패널
				&.swiper-slide-prev {
					.inner {
						opacity: 0;
						transform: scale(1.5);
					}
				}

				//활성화 패널
				&.swiper-slide-active {
					.inner {
						opacity: 1;
						transform: scale(1);
					}
				}

				//다음 패널
				&.swiper-slide-next {
					.inner {
						opacity: 0.5;
						transform: scale(0.6);
					}
				}
			}
		}
	}

	.btnStart {
		position: absolute;
		bottom: 5vh;
		right: 30vw;
		z-index: 11;
		border: none;
		background: transparent;
		font-size: 1.4rem;
		color: #444;
		cursor: pointer;
	}

	.swiper-pagination {
		position: absolute;
		top: 15vh;
		right: 20vw;
		z-index: 3;
		font: 200 italic 2rem/1 'raleway';
		color: #888;

		.swiper-pagination-current {
			font-size: 5rem;
			color: #111;
		}
	}
}

@media screen and (max-width: $tablet) {
	.visual {
		.textBox {
			width: 80%;
			left: 10%;
			top: auto;
			bottom: 20vh;
			z-index: 4;
		}

		.swiper {
			left: 0%;
			padding: 10vh 10vw;
		}
	}
}