from flask import Flask, render_template, request, redirect, url_for, session, flash
from datetime import datetime
from functools import wraps

# Create the Flask application
app = Flask(__name__)
app.secret_key = 'your-very-secret-key-change-this'  # Required for sessions – change to a random string!

# Decorator to require login on protected pages
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            flash('Please log in first.', 'warning')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# ---------- Login / Logout ----------
@app.route('/login', methods=['GET', 'POST'])
def login():
    # If user is already logged in, send them to the dashboard
    if session.get('logged_in'):
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Simple hardcoded check – replace with database later
        if username == 'admin' and password == 'admin123':
            session['logged_in'] = True
            session['username'] = username
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password', 'danger')
            return redirect(url_for('login'))
    
    # GET request – show login page
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))

# ---------- Protected Pages (all require login) ----------
@app.route('/')
@login_required
def dashboard():
    return render_template('index.html')

@app.route('/member-management')
@login_required
def member_management():
    return render_template('member_management.html')

@app.route('/finance')
@login_required
def finance():
    return render_template('finance.html')

@app.route('/qurbana')
@login_required
def qurbana():
    return render_template('qurbana.html')

@app.route('/donations')
@login_required
def donations():
    return render_template('donations.html')

@app.route('/certificates')
@login_required
def certificates():
    return render_template('certificates.html')

@app.route('/payroll')
@login_required
def payroll():
    return render_template('payroll.html')

@app.route('/events')
@login_required
def events():
    return render_template('events.html')

@app.route('/reports')
@login_required
def reports():
    return render_template('reports.html')

@app.route('/admin')
@login_required
def admin():
    return render_template('admin.html')

@app.route('/add_member')
@login_required
def add_member():
    return render_template('add_member.html')

@app.route('/mass-booking')
@login_required
def mass_booking():
    return render_template('mass_booking.html')

@app.route('/record-donation')
@login_required
def record_donation():
    today = datetime.now().strftime('%Y-%m-%d')
    return render_template('record_donation.html', now_date=today)

@app.route('/finance/income-expense')
def income_expense():
    # Fetch recent transactions from database (adjust to your ORM)
    # Example using SQLAlchemy:
    # transactions = Transaction.query.order_by(Transaction.date.desc()).limit(10).all()
    
    # For now, you can pass an empty list to test the page
    transactions = []  # replace with real data later
    return render_template('income_expense.html', transactions=transactions)

# 👇 INSERT THE NEW ROUTE HERE
@app.route('/finance/add-transaction', methods=['POST'])
def add_transaction():
    # Extract form data
    transaction_type = request.form['type']
    date = request.form['date']
    description = request.form['description']
    amount = request.form['amount']
    category = request.form['category']
    method = request.form['method']
    notes = request.form.get('notes', '')

    # TODO: Save to database (uncomment when your model is ready)
    # new_trans = Transaction(...)
    # db.session.add(new_trans)
    # db.session.commit()

    # After saving, redirect back to the income/expense page
    return redirect(url_for('income_expense'))

events = []  # list of event dicts

@app.route('/events/planning')
def event_planning():
    # Sort events by date (soonest first)
    upcoming = sorted(events, key=lambda e: e['date'])[:10]
    return render_template('event_planning.html', events=upcoming)

@app.route('/events/add', methods=['POST'])
def add_event():
    new_event = {
        'name': request.form['name'],
        'date': request.form['date'],
        'start_time': request.form['start_time'],
        'end_time': request.form['end_time'],
        'location': request.form['location'],
        'organizer': request.form.get('organizer', ''),
        'description': request.form.get('description', '')
    }
    events.append(new_event)
    return redirect(url_for('event_planning'))

# Run the app
if __name__ == '__main__':
    app.run(debug=True)