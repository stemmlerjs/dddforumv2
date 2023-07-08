
interface Props {
  username?: string;
  isLoggedIn: boolean;
} 

export class MenuViewModel {
  constructor(private props: Props) {
  }

  getFormattedUsername() {
    if (!this.props.username) return '';
    return `@${this.props.username.toLowerCase()}`;
  }

  isLoggedIn () {
    return this.props.isLoggedIn;
  }
}