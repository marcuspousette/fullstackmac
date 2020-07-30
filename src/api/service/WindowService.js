class WindowService {
	static getWindowDimensions() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	static isBigDesktop() {
		const { innerWidth } = this.getWindowDimensions();
		return innerWidth < 1200 ? false : true;
	}
}

export default WindowService;
