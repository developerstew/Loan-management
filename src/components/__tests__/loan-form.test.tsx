import { render, screen } from '@/test/test-utils';
import { LoanForm } from '../forms/loans/layout';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
}));

describe('LoanForm', () => {
  it('renders all form fields', () => {
    render(<LoanForm onSubmit={jest.fn()} />);

    // Check for form fields
    expect(screen.getByLabelText(/borrower name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/loan amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const mockSubmit = jest.fn();
    const { user } = render(<LoanForm onSubmit={mockSubmit} />);

    // Fill out form
    await user.type(screen.getByLabelText(/borrower name/i), 'John Doe');
    await user.type(
      screen.getByLabelText(/borrower email/i),
      'john@example.com',
    );
    await user.type(screen.getByLabelText(/loan amount/i), '1000');
    await user.type(screen.getByLabelText(/interest rate/i), '5');
    await user.type(screen.getByLabelText(/term/i), '12');
    await user.type(screen.getByLabelText(/start date/i), '2025-01-01');
    await user.type(screen.getByLabelText(/description/i), 'Test loan');

    // Submit form
    await user.click(screen.getByRole('button', { name: /create loan/i }));

    // Check if onSubmit was called with correct data
    expect(mockSubmit).toHaveBeenCalledWith({
      borrowerName: 'John Doe',
      borrowerEmail: 'john@example.com',
      amount: '1000',
      interestRate: '5',
      term: '12',
      startDate: '2025-01-01',
      description: 'Test loan',
    });
  });

  it('shows validation errors for invalid data', async () => {
    const { user } = render(<LoanForm onSubmit={jest.fn()} />);

    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /create loan/i }));

    // Check for error messages
    expect(
      screen.getByText('Borrower name must be at least 2 characters.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter a valid email address.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please enter a valid amount/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please enter a valid interest rate/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter a valid date (YYYY-MM-DD)'),
    ).toBeInTheDocument();
  });
});
