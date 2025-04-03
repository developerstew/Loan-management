import { render, screen } from '@/test/test-utils';
import { LoanForm } from '../forms/loans/layout';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
}));

describe('LoanForm', () => {
  it('renders all form fields', () => {
    render(<LoanForm />);

    // Check for form fields
    expect(screen.getByLabelText(/borrower name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/loan amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { user } = render(<LoanForm />);

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

    // Check if form fields are filled
    expect(screen.getByLabelText(/borrower name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/borrower email/i)).toHaveValue(
      'john@example.com',
    );
    expect(screen.getByLabelText(/loan amount/i)).toHaveValue('1000');
    expect(screen.getByLabelText(/interest rate/i)).toHaveValue('5');
    expect(screen.getByLabelText(/term/i)).toHaveValue('12');
    expect(screen.getByLabelText(/start date/i)).toHaveValue('2025-01-01');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Test loan');
  });

  it('shows validation errors for invalid data', async () => {
    const { user } = render(<LoanForm />);

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
