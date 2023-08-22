
interface Props {
  title: string;
}

export class PostViewModel {
  constructor (private props: Props) {
    this.props = props
  }

  getTitle () {
    return this.props.title;
  }
}

